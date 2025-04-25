const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Basket = require("../models/Basket");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role, basketId) => {
  return jwt.sign({ id, email, role, basketId }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  // Registration
  async registration(req, res, next) {
    try {
      const { email, password, role, basketId } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Email or password was not specified"));
      }
      // Check if user with this email already exists
      const candidate = await User.findOne({ email }).exec();
      if (candidate) {
        return next(ApiError.badRequest("User with this email already exists"));
      }
      // Hash password
      const hashPassword = await bcrypt.hash(password, 5);
      const user = new User({
        email,
        role: role || "USER",
        password: hashPassword,
      });
      await user.save();
      // Create basket for a new user
      const basket = await Basket.create({ user_id: user.id });
      user.basket_id = basket._id;
      await user.save(); // Second save to update the user with basket_id
      const token = generateJwt(user.id, user.email, user.role, basket._id);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  // Login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return next(
          ApiError.unauthorized("User with this email was not found")
        );
      }
      // Compare passwords
      let comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Password is incorrect"));
      }
      // Generate token
      const token = generateJwt(user.id, user.email, user.role, user.basket_id);

      let basket = await Basket.findOne({ user_id: user._id });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          basketId: user.basket_id,
        },
        basket: basket.items,
      });
    } catch (error) {
      next(error);
    }
  }

  // Check if user is authorized
  async check(req, res, next) {
    try {
      const token = generateJwt(
        req.user.id,
        req.user.email,
        req.user.role,
        req.user.basketId
      );
      
      //Load the user's basket
      const basket = await Basket.findById(req.user.basketId).populate(
        "items.device_id"
      );
      
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }
      res.json({
        token,
        user: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
          basketId: req.user.basketId,
        },
        basket: basket.items, // Return the basket items
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

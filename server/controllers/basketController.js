const Basket = require("../models/Basket");
const ApiError = require("../error/ApiError");

class BasketController {
  // Get all basket items for a specific basket
  async getAll(req, res, next) {
    try {
      const { basket_id } = req.query;

      const basket = await Basket.findById(basket_id).populate(
        "items.device_id"
      );
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }
      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }

  // Add or update an item in the basket.
  // If the item exists, update its quantity (or remove it if quantity <= 0).
  // If the item doesn't exist, add it with quantity 1.
  async addOrUpdate(req, res, next) {
    try {
      const { basket_id, quantity, device_id } = req.body;

      // basket_id and device_id are required.
      if (!basket_id || !device_id) {
        return next(
          ApiError.badRequest("basket_id and device_id are required")
        );
      }

      const basket = await Basket.findById(basket_id);
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }

      // Find index of the item (if it exists) in the basket items array.
      const itemIndex = basket.items.findIndex(
        (item) => item.device_id.toString() === device_id
      );

      if (itemIndex !== -1) {
        // Item already exists in the basket.
        if (typeof quantity !== "undefined") {
          // If quantity is provided, update it.
          if (quantity <= 0) {
            // Remove the item if quantity is 0 or less.
            basket.items.splice(itemIndex, 1);
          } else {
            basket.items[itemIndex].quantity += quantity;
          }
        } else {
          // If no quantity is provided, simply increment the quantity by 1.
          basket.items[itemIndex].quantity += 1;
        }
      } else {
        // Item does not exist, so add it with a default quantity of 1.
        basket.items.push({ device_id, quantity: 1 });
      }

      await basket.save();
      const resbasket = await Basket.findById(basket_id).populate(
        "items.device_id"
      );
      return res.json(resbasket);
    } catch (e) {
      next(e);
    }
  }

  // Add a single item to the basket.
  async addOne(req, res, next) {
    try {
      const { basket_id, device_id } = req.body;

      if (!basket_id || !device_id) {
        return next(
          ApiError.badRequest("basket_id and device_id are required")
        );
      }

      const basket = await Basket.findById(basket_id);
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }

      const item = basket.items.find(
        (item) => item.device_id.toString() === device_id
      );

      if (item) {
        item.quantity += 1;
      } else {
        // If the item doesn't exist, optionally add it with quantity 1
        basket.items.push({ device_id, quantity: 1 });
      }

      await basket.save();
      const resbasket = await Basket.findById(basket_id).populate(
        "items.device_id"
      );
      return res.json(resbasket);
    } catch (e) {
      next(e);
    }
  }

  // Delete a single item to the basket.
  async deleteOne(req, res, next) {
    try {
      const { basket_id, device_id } = req.body;

      if (!basket_id || !device_id) {
        return next(
          ApiError.badRequest("basket_id and device_id are required")
        );
      }
     // Find the basket by ID
      // and populate the items with device_id details.
      const basket = await Basket.findById(basket_id);
     
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }

      // Find the index of the item in the array
      const itemIndex = basket.items.findIndex(
        (item) => item.device_id.toString() === device_id
      );

      if (itemIndex !== -1) {
        if (basket.items[itemIndex].quantity > 1) {
          basket.items[itemIndex].quantity -= 1;
        } else {
          // Quantity is 1, remove the item
          basket.items.splice(itemIndex, 1);
        }
      } else {
        return next(ApiError.badRequest("Item not found in basket"));
      }

      await basket.save();
      
      const resbasket = await Basket.findById(basket_id).populate(
        "items.device_id"
      );
      return res.json(resbasket);
    } catch (e) {
      next(e);
    }
  }

  // clear the entire basket.
  async clearBasket(req, res, next) {
    try {
      const { basket_id } = req.params;

      if (!basket_id) {
        return next(ApiError.badRequest("basket_id is required"));
      }

      const basket = await Basket.findById(basket_id);
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }

      basket.items = []; // Clear the items array
      await basket.save();
      const resbasket = await Basket.findById(basket_id).populate(  
          "items.device_id"
        );

      return res.json(resbasket);
    } catch (e) {
      next(e);
    }
  }
}

  


module.exports = new BasketController();

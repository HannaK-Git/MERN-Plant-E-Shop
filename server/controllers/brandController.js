const Brand = require("../models/Brand");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res, next) {
    try{
    const { name } = req.body;

    if(!name) {
      return next(ApiError.badRequest("Brand name is required."));
    }
    const brand = await Brand.create({ name });
    return res.status(201).json(brand);
    } catch (e) {
      console.error("Error in BrandController.create:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  // Fetch all brands
  async getAll(req, res, next) {
    try{
    const brands = await Brand.find();
    return res.json(brands);
    } catch (e) {
      console.error("Error in BrandController.getAll:", e);
      next(ApiError.badRequest("Error fetching brands from database."));
    }

  }
}

module.exports = new BrandController();

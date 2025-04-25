const  Type  = require('../models/Type');
const ApiError = require('../error/ApiError');

class TypeController {
  // Create new type
  async create(req, res, next) {
    try{
    const { name } = req.body;
    if(!name){
      return next(ApiError.badRequest('Name is required!'));
    }
    const type = await Type.create({ name });
    return res.status(201).json(type);
    } catch (e) {
      next(e);
    }
  }

  // Get all types
  async getAll(req, res, next) {
    try{
    const types = await Type.find();
    return res.json(types);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TypeController();

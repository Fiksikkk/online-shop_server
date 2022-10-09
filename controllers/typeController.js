const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("Incorrect type name!"));
    }
    const isExist = await Type.findOne({ where: { name } });
    if (isExist) {
      return next(ApiError.badRequest("This type name already exist!"));
    }
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();

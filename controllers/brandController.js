const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res, next) {
    console.log(req)
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("Incorrect brand name!"));
    }
    const isExist = await Brand.findOne({ where: { name } });
    if (isExist) {
      return next(ApiError.badRequest("This brand name already exist!"));
    }

    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new BrandController();

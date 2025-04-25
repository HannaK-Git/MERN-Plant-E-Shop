const uuid = require("uuid");
const path = require("path");
const Device = require("../models/Device");
const DeviceInfo = require("../models/DeviceInfo");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brand_id, type_id, info } = req.body;

      // Ensure an image file was provided
      if (!req.files || !req.files.img) {
        return next(ApiError.badRequest("Image file is required"));
      }

      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      // Await the file move operation to ensure the file is saved before proceeding
      await img.mv(path.resolve(__dirname, "..", "static", fileName));

      let infoIds = [];
      if (info) {
        // Parse info if provided, expecting a JSON string
        info = JSON.parse(info);
        // Create all DeviceInfo records concurrently and gather their IDs
        infoIds = await Promise.all(
          info.map(async (i) => {
            const createdInfo = await DeviceInfo.create({
              title: i.title,
              description: i.description,
            });
            return createdInfo._id;
          })
        );
      }

      // Create the device record, associating the saved image and info IDs
      const device = await Device.create({
        name,
        price,
        brand_id,
        type_id,
        img: fileName,
        info: infoIds,
      });

      return res.status(201).json(device);
    } catch (e) {
      console.error("Error in DeviceController.create:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  // Fetch devices with optional filters
  async getAll(req, res, next) {
    try {
      let { brand_id, type_id, limit, page } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 9;
      const offset = (page - 1) * limit;

      // Build dynamic filter based on query parameters
      const filter = {};
      if (brand_id) filter.brand_id = brand_id;
      if (type_id) filter.type_id = type_id;

      // Execute queries concurrently for efficiency
      const devicesPromise = Device.find(filter)
        .populate("brand_id")
        .populate("type_id")
        .limit(limit)
        .skip(offset)
        .exec();
      const countPromise = Device.countDocuments(filter).exec();

      const [devices, count] = await Promise.all([
        devicesPromise,
        countPromise,
      ]);

      return res.json({ devices, count });
    } catch (error) {
      console.error("Error in DeviceController.getAll:", error);
      return res.status(500).json({ message: "Failed to fetch devices." });
    }
  }

  // Fetch a single device by ID
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findById(id).populate("info").exec();
      if (!device) {
        return next(ApiError.notFound("Device not found"));
      }
      return res.json(device);
    } catch (error) {
      console.error("Error in DeviceController.getOne:", error);
      return next(ApiError.badRequest("Invalid device ID"));
    }
  }
}

module.exports = new DeviceController();

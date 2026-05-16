const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),

    // Image is uploaded via multer (req.file) so we should NOT validate its shape here.
    image: Joi.any().optional().allow(null),
  }).required(),
}).options({ stripUnknown: true });

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required().min(3).max(500),
  }).required(),
});

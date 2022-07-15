import {
  MIN_DIM_ERR_MSG,
  MIN_IMG_HEIGHT,
  MIN_IMG_WIDTH,
} from "../util/constant";

const Joi = require("joi");

// const imgDimensionSchema = Joi.object({
//   width: Joi.number()
//     .required()
//     .min(MIN_IMG_WIDTH)
//     .messages({ "number.min": MIN_DIM_ERR_MSG }),
//   height: Joi.number()
//     .required()
//     .min(MIN_IMG_HEIGHT)
//     .messages({ "number.min": MIN_DIM_ERR_MSG }),
// });

const schema = Joi.object({
  title: Joi.string().required().min(3).max(200),
  author: Joi.string().required().min(3).max(50),
  lang: Joi.string().required().valid("en", "fr"),
  content: Joi.string().required(),
  show_post: Joi.boolean().required(),
  tags: Joi.array(),
  keywords: Joi.array(),
  slug: Joi.string().required().min(3).max(200),
  image: Joi.any()
    .required()
    .invalid(null)
    .messages({ "any.invalid": '"image" is not allowed to be empty' })
  // imgDimension: imgDimensionSchema,
});

export const validateSchema = (data) => {
  return schema
    .validateAsync(data, { abortEarly: false })
    .then(() => [])
    .catch((err) => {
      return err.details;
    });
};

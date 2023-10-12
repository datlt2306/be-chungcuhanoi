import Joi from "joi";

export const roleSchema = Joi.object({
  role: Joi.string().required().valid("admin", "member").min(3).messages({
    "string.min": `"role phải có ít nhất 3 ký tự"`,
    "string.base": `"role" phải là kiểu "text"`,
    "string.empty": `"role" không được bỏ trống`,
    "any.required": `"role" là trường bắt buộc`,
    "any.only": "role chỉ có thể là admin hoặc member",
  }),
});

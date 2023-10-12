import Joi from "joi";

export const roleSchema = Joi.object({
  role: Joi.string().required().min(3).messages({
    "string.min": `"role phải có ít nhất 3 ký tự"`,
    "string.base": `"email" phải là kiểu "text"`,
    "string.empty": `"email" không được bỏ trống`,
    "any.required": `"email" là trường bắt buộc`,
  }),
});

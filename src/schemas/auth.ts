import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    "string.min": `"name phải có ít nhất 3 ký tự"`,
    "string.base": `"name" phải là kiểu "text"`,
    "string.empty": `"name" không được bỏ trống`,
    "any.required": `"name" là trường bắt buộc`,
  }),
  avata: Joi.string().allow("").optional().messages({
    "string.base": `"avata" phải là kiểu "text"`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `"email" phải là kiểu "text"`,
    "string.empty": `"email" không được bỏ trống`,
    "string.email": `"email" phải có định dạng là email`,
    "any.required": `"email" là trường bắt buộc`,
  }),
  phone: Joi.string()
    .pattern(/((( +|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
    .required()
    .messages({
      "any.required": `"Số điện thoại" là trường bắt buộc`,
      "string.empty": `"Số điện thoại" không được bỏ trống`,
      "string.pattern.base": `"Số điện thoại" không hợp lệ`,
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": `"password" phải là kiểu "text"`,
    "string.empty": `"password" không được bỏ trống`,
    "string.min": `"password" phải chứa ít nhất {#limit} ký tự`,
    "any.required": `"password" là trường bắt buộc`,
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.base": `"confirmPassword" phải là kiểu "text"`,
      "string.empty": `"confirmPassword" không được bỏ trống`,
      "any.only": `"confirmPassword" phải giống "password"`,
      "any.required": `"confirmPassword" là trường bắt buộc`,
    }),
});
export const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `"email" phải là kiểu "text"`,
    "string.empty": `"email" không được bỏ trống`,
    "string.email": `"email" phải có định dạng là email`,
    "any.required": `"email" là trường bắt buộc`,
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": `"password" phải là kiểu "text"`,
    "string.empty": `"password" không được bỏ trống`,
    "string.min": `"password" phải chứa ít nhất {#limit} ký tự`,
    "any.required": `"password" là trường bắt buộc`,
  }),
});

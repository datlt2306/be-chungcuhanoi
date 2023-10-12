import Joi from "joi"

export const categorySchema = Joi.object({
    category_name: Joi.string().required().messages({
        "string.empty": "Tên danh mục bắt buộc nhập",
        "any.required": "Trường danh mục bắt buộc nhập"
    }),
    category_description: Joi.string()
});
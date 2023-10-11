import Joi from "joi"

export const categorySchema = Joi.object({
    Category_name: Joi.string().required().messages({
        "string.empty": "Tên danh mục bắt buộc nhập",
        "any.required": "Trường danh mục bắt buộc nhập"
    }),
    Category_descrition: Joi.string()
});
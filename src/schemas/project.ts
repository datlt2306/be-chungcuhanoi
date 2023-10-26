
import joi from 'joi';

export const projectSchema = joi.object({
    project_name: joi.string().required(),
    project_price: joi.number().required().min(0),
    project_room: joi.number().required().min(0),
    project_view: joi.number().min(0),
    map_link: joi.string(),
    project_location: joi.string(),
    status: joi.string(),
    project_district: joi.string(),
    project_content: joi.string(),
    project_acreage: joi.number(),
    project_image: joi.array(),
    categoryId: joi.string().required(),
    userId: joi.string().required(),
});

export const projectUpdateSchema = joi.object({
    _id: joi.string(),
    project_name: joi.string().required(),
    project_price: joi.number().required().min(0),
    project_room: joi.number().required().min(0),
    project_view: joi.number().min(0),
    map_link: joi.string(),
    project_location: joi.string(),
    status: joi.string(),
    project_district: joi.string(),
    project_content: joi.string(),
    project_acreage: joi.number(),
    project_image: joi.array(),
    categoryId: joi.string().required(),
    userId: joi.string().required(),
    createdAt: joi.date().default(() => new Date()),
    updatedAt: joi.date().default(() => new Date()),
});

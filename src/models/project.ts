import mongoose from "mongoose";
import { IProject } from './../interfaces/project';
import mongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, MongooseDelete];

const projectSchema = new mongoose.Schema<IProject>({
    project_name: {
        type: String,
        maxlength: 55,
        required: true,
    },
    map_link: {
        type: String,
    },
    project_location: {
        type: String,
        maxlength: 255,
        required: true,
    },
    project_district: {
        type: String,
        maxlength: 255,
        required: true,
    },
    project_address: {
        type: String,
        maxlength: 255,
        required: true,
    },
    project_content: {
        type: String,
        maxlength: 255,
        required: true,
    },
    project_price: {
        type: Number,
        min: 0,
        required: true,
    },
    project_acreage: {
        type: Number,
        min: 0,
        required: true,
    },
    project_room: {
        type: Number,
        min: 0,
        required: true,
    },
    project_image: {
        type: Array,
        require: true,
    },
    project_view: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, versionKey: false
})

plugins.forEach((plugin) => {
    projectSchema.plugin(plugin, {
        deletedAt: true,
        overrideMethods: true,
    });
});

projectSchema.plugin(mongoosePaginate)

export default mongoose.model<IProject>("Project", projectSchema)
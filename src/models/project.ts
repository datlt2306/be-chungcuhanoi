import mongoose from "mongoose";
import { IProject } from './../interfaces/project';
import mongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, MongooseDelete];

const projectSchema = new mongoose.Schema<IProject>({
    project_name: {
        type: String,
        maxlength: 255,
    },
    map_link: {
        type: String,
    },
    project_location: {
        type: String,
        maxlength: 255,
    },
    project_district: {
        type: String,
        maxlength: 255,
    },
    project_content: {
        type: String,

    },
    project_price: {
        type: Number,
        min: 0,
    },
    project_acreage: {
        type: Number,
        min: 0,
    },
    project_room: {
        type: Number,
        min: 0,
    },
    project_image: {
        type: Array,
    },
    project_view: {
        type: Number,
        default: 0,
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
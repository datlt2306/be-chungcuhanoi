import mongoose from "mongoose";
import { IProject } from "./../interfaces/project";
import mongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, MongooseDelete];

const projectSchema = new mongoose.Schema<IProject>(
  {
    project_name: {
      type: String,
      maxlength: 55,
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
    project_wards: {
      type: String,
      maxlength: 255,
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
      min: 0,
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
    description_group: {
      overview: {
        overview_description: { type: String },
        overview_image: { type: Object },
      }, // tổng quan
      location: {
        // Vị trí
        location_description: { type: String },
        location_image: { type: Array },
        location_image_description: { type: String },
      },
      utilities: {
        // tiện ích
        utilities_title: String,
        utilities_description: String,
        image: [
          {
            utilities_image: Object,
            utilities_image_description: String,
          },
        ],
      },
      floor_design: [
        // thiết kế mặt bằng
        {
          floor_design_title: String,
          floor_design_image: Object,
          floor_design_image_description: String,
          floor_design_description_detail: String,
        },
      ],
      utilities_additional: [
        {
          // tiện ích bổ sung
          utilities_additional_title: String,
        },
      ],
    },
    status: {
      type: Number,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

plugins.forEach((plugin) => {
  projectSchema.plugin(plugin, {
    deletedAt: true,
    overrideMethods: true,
  });
});

projectSchema.plugin(mongoosePaginate);

export default mongoose.model<IProject>("Project", projectSchema);

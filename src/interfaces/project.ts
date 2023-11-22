import mongoose from "mongoose";

export interface IProject {
    project_name: string,
    project_price: number,
    project_room: number,
    project_image?: [],
    project_location: string,
    project_content: string,
    project_view: Number,
    project_address: string,
    project_acreage?: number,
    project_district?: string,
    categoryId: mongoose.Types.ObjectId,
    userId?: mongoose.Types.ObjectId,
    status?: [],
    description_group: object,
    map_link?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    deleted?: boolean,
    project_wards?: string
}

export interface IprojectResponse {
    data: IProject[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
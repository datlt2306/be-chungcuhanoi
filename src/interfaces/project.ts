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
    // categoryId: mongoose.Types.ObjectId,
    // userId?: mongoose.Types.ObjectId,
    status?: [],
    map_link?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IprojectResponse {
    data: IProject[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
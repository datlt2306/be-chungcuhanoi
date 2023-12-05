import mongoose from "mongoose";

export interface ICategory {
    category_name: string;
    category_description:string;
    Project: mongoose.Types.ObjectId;
}


export interface IcategoryResponse {
    data: ICategory[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
import { Model } from "mongoose";
import { IBaseRepository } from "../../../domain/interfaces/common/Ibase.repository";

export class BaseRepository<T> implements IBaseRepository<T> {

    constructor(
        protected model: Model<any>
    ) { }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findOne(filter: object): Promise<T | null> {
        return await this.model.findOne(filter);
    }

    async find(filter: object): Promise<T[]> {
        return await this.model.find(filter);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await this.model.findByIdAndDelete(id);
        return !!deleted;
    }
}
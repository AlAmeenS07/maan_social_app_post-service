import { Model } from "mongoose";
import { IBaseRepository } from "../../../domain/interfaces/common/Ibase.repository";
import { IBaseMapper } from "../../../domain/interfaces/common/IBase.mapper";

export class BaseRepository<Domain, Persistence extends object> implements IBaseRepository<Domain> {

  constructor(
    protected model: Model<any>,
    protected mapper: IBaseMapper<Domain, Persistence>
  ) {}

  async create(data: Domain): Promise<Domain> {
    const created = await this.model.create(this.mapper.toPersistence(data));
    return this.mapper.toDomain(created);
  }

  async findById(id: string): Promise<Domain | null> {
    const document = await this.model.findById(id);
    return document ? this.mapper.toDomain(document) : null;
  }

  async findOne(filter: object): Promise<Domain | null> {
    const document = await this.model.findOne(filter);
    return document ? this.mapper.toDomain(document) : null;
  }

  async find(filter: object): Promise<Domain[]> {
    const documents = await this.model.find(filter);
    return documents.map(doc => this.mapper.toDomain(doc));
  }

  async update(id: string, data: Domain): Promise<Domain | null> {
    const updated = await this.model.findByIdAndUpdate(
      id,
      this.mapper.toPersistence(data),
      { new: true }
    );

    return updated ? this.mapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.findByIdAndDelete(id);
    return deleted;
  }
}
export interface IBaseMapper<Domain,Persistence> {

  toDomain(raw: Persistence): Domain;

  toPersistence(domain: Domain): Persistence;
}
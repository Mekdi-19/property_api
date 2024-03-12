import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Rent, RentRelations} from '../models';

export class RentRepository extends DefaultCrudRepository<
  Rent,
  typeof Rent.prototype.id,
  RentRelations
> {
  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource,
  ) {
    super(Rent, dataSource);
  }
}

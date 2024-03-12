import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Gallary, GallaryRelations} from '../models';

export class GallaryRepository extends DefaultCrudRepository<
  Gallary,
  typeof Gallary.prototype.id,
  GallaryRelations
> {
  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource,
  ) {
    super(Gallary, dataSource);
  }
}

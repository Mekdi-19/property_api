import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Profile, ProfileRelations} from '../models';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource,
  ) {
    super(Profile, dataSource);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Location, LocationRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {

  public readonly property: HasOneRepositoryFactory<Property, typeof Location.prototype.id>;

  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Location, dataSource);
    this.property = this.createHasOneRepositoryFactoryFor('property', propertyRepositoryGetter);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}

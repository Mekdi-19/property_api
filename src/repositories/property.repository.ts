import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Property, PropertyRelations, Rent, Location, Gallary} from '../models';
import {RentRepository} from './rent.repository';
import {LocationRepository} from './location.repository';
import {GallaryRepository} from './gallary.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly rents: HasManyRepositoryFactory<Rent, typeof Property.prototype.id>;

  public readonly location: HasOneRepositoryFactory<Location, typeof Property.prototype.id>;

  public readonly gallaries: HasManyRepositoryFactory<Gallary, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource, @repository.getter('RentRepository') protected rentRepositoryGetter: Getter<RentRepository>, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('GallaryRepository') protected gallaryRepositoryGetter: Getter<GallaryRepository>,
  ) {
    super(Property, dataSource);
    this.gallaries = this.createHasManyRepositoryFactoryFor('gallaries', gallaryRepositoryGetter,);
    this.registerInclusionResolver('gallaries', this.gallaries.inclusionResolver);
    this.location = this.createHasOneRepositoryFactoryFor('location', locationRepositoryGetter);
    this.registerInclusionResolver('location', this.location.inclusionResolver);
    this.rents = this.createHasManyRepositoryFactoryFor('rents', rentRepositoryGetter,);
    this.registerInclusionResolver('rents', this.rents.inclusionResolver);
  }
}

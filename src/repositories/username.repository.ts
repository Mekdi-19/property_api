import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {PropertyRentDataSource} from '../datasources';
import {Username, UsernameRelations, Profile, Property} from '../models';
import {ProfileRepository} from './profile.repository';
import {PropertyRepository} from './property.repository';

export class UsernameRepository extends DefaultCrudRepository<
  Username,
  typeof Username.prototype.id,
  UsernameRelations
> {

  public readonly profile: HasOneRepositoryFactory<Profile, typeof Username.prototype.id>;

  public readonly properties: HasManyRepositoryFactory<Property, typeof Username.prototype.id>;

  constructor(
    @inject('datasources.property_rent') dataSource: PropertyRentDataSource, @repository.getter('ProfileRepository') protected profileRepositoryGetter: Getter<ProfileRepository>, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Username, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
    this.profile = this.createHasOneRepositoryFactoryFor('profile', profileRepositoryGetter);
    this.registerInclusionResolver('profile', this.profile.inclusionResolver);
  }
}

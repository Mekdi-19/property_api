import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  Location,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyLocationController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/location', {
    responses: {
      '200': {
        description: 'Property has one Location',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Location>,
  ): Promise<Location> {
    return this.propertyRepository.location(id).get(filter);
  }

  @post('/properties/{id}/location', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) location: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.propertyRepository.location(id).create(location);
  }

  @patch('/properties/{id}/location', {
    responses: {
      '200': {
        description: 'Property.Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Partial<Location>,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.propertyRepository.location(id).patch(location, where);
  }

  @del('/properties/{id}/location', {
    responses: {
      '200': {
        description: 'Property.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.propertyRepository.location(id).delete(where);
  }
}

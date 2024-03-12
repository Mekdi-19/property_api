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
  Location,
  Property,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationPropertyController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/property', {
    responses: {
      '200': {
        description: 'Location has one Property',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Property),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Property>,
  ): Promise<Property> {
    return this.locationRepository.property(id).get(filter);
  }

  @post('/locations/{id}/property', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Property)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Location.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {
            title: 'NewPropertyInLocation',
            exclude: ['id'],
            optional: ['locationId']
          }),
        },
      },
    }) property: Omit<Property, 'id'>,
  ): Promise<Property> {
    return this.locationRepository.property(id).create(property);
  }

  @patch('/locations/{id}/property', {
    responses: {
      '200': {
        description: 'Location.Property PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Partial<Property>,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.locationRepository.property(id).patch(property, where);
  }

  @del('/locations/{id}/property', {
    responses: {
      '200': {
        description: 'Location.Property DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.locationRepository.property(id).delete(where);
  }
}

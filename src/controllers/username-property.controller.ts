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
  Username,
  Property,
} from '../models';
import {UsernameRepository} from '../repositories';

export class UsernamePropertyController {
  constructor(
    @repository(UsernameRepository) protected usernameRepository: UsernameRepository,
  ) { }

  @get('/usernames/{id}/properties', {
    responses: {
      '200': {
        description: 'Array of Username has many Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Property>,
  ): Promise<Property[]> {
    return this.usernameRepository.properties(id).find(filter);
  }

  @post('/usernames/{id}/properties', {
    responses: {
      '200': {
        description: 'Username model instance',
        content: {'application/json': {schema: getModelSchemaRef(Property)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Username.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {
            title: 'NewPropertyInUsername',
            exclude: ['id'],
            optional: ['usernameId']
          }),
        },
      },
    }) property: Omit<Property, 'id'>,
  ): Promise<Property> {
    return this.usernameRepository.properties(id).create(property);
  }

  @patch('/usernames/{id}/properties', {
    responses: {
      '200': {
        description: 'Username.Property PATCH success count',
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
    return this.usernameRepository.properties(id).patch(property, where);
  }

  @del('/usernames/{id}/properties', {
    responses: {
      '200': {
        description: 'Username.Property DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.usernameRepository.properties(id).delete(where);
  }
}

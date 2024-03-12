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
  Gallary,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyGallaryController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/gallaries', {
    responses: {
      '200': {
        description: 'Array of Property has many Gallary',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gallary)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Gallary>,
  ): Promise<Gallary[]> {
    return this.propertyRepository.gallaries(id).find(filter);
  }

  @post('/properties/{id}/gallaries', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gallary)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gallary, {
            title: 'NewGallaryInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) gallary: Omit<Gallary, 'id'>,
  ): Promise<Gallary> {
    return this.propertyRepository.gallaries(id).create(gallary);
  }

  @patch('/properties/{id}/gallaries', {
    responses: {
      '200': {
        description: 'Property.Gallary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gallary, {partial: true}),
        },
      },
    })
    gallary: Partial<Gallary>,
    @param.query.object('where', getWhereSchemaFor(Gallary)) where?: Where<Gallary>,
  ): Promise<Count> {
    return this.propertyRepository.gallaries(id).patch(gallary, where);
  }

  @del('/properties/{id}/gallaries', {
    responses: {
      '200': {
        description: 'Property.Gallary DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gallary)) where?: Where<Gallary>,
  ): Promise<Count> {
    return this.propertyRepository.gallaries(id).delete(where);
  }
}

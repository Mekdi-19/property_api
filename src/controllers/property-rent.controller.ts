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
  Rent,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyRentController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/rents', {
    responses: {
      '200': {
        description: 'Array of Property has many Rent',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rent)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rent>,
  ): Promise<Rent[]> {
    return this.propertyRepository.rents(id).find(filter);
  }

  @post('/properties/{id}/rents', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rent)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rent, {
            title: 'NewRentInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) rent: Omit<Rent, 'id'>,
  ): Promise<Rent> {
    return this.propertyRepository.rents(id).create(rent);
  }

  @patch('/properties/{id}/rents', {
    responses: {
      '200': {
        description: 'Property.Rent PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rent, {partial: true}),
        },
      },
    })
    rent: Partial<Rent>,
    @param.query.object('where', getWhereSchemaFor(Rent)) where?: Where<Rent>,
  ): Promise<Count> {
    return this.propertyRepository.rents(id).patch(rent, where);
  }

  @del('/properties/{id}/rents', {
    responses: {
      '200': {
        description: 'Property.Rent DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rent)) where?: Where<Rent>,
  ): Promise<Count> {
    return this.propertyRepository.rents(id).delete(where);
  }
}

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rent} from '../models';
import {RentRepository} from '../repositories';

export class RentController {
  constructor(
    @repository(RentRepository)
    public rentRepository : RentRepository,
  ) {}

  @post('/rents')
  @response(200, {
    description: 'Rent model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rent)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rent, {
            title: 'NewRent',
            exclude: ['id'],
          }),
        },
      },
    })
    rent: Omit<Rent, 'id'>,
  ): Promise<Rent> {
    return this.rentRepository.create(rent);
  }

  @get('/rents/count')
  @response(200, {
    description: 'Rent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rent) where?: Where<Rent>,
  ): Promise<Count> {
    return this.rentRepository.count(where);
  }

  @get('/rents')
  @response(200, {
    description: 'Array of Rent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rent) filter?: Filter<Rent>,
  ): Promise<Rent[]> {
    return this.rentRepository.find(filter);
  }

  @patch('/rents')
  @response(200, {
    description: 'Rent PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rent, {partial: true}),
        },
      },
    })
    rent: Rent,
    @param.where(Rent) where?: Where<Rent>,
  ): Promise<Count> {
    return this.rentRepository.updateAll(rent, where);
  }

  @get('/rents/{id}')
  @response(200, {
    description: 'Rent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rent, {exclude: 'where'}) filter?: FilterExcludingWhere<Rent>
  ): Promise<Rent> {
    return this.rentRepository.findById(id, filter);
  }

  @patch('/rents/{id}')
  @response(204, {
    description: 'Rent PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rent, {partial: true}),
        },
      },
    })
    rent: Rent,
  ): Promise<void> {
    await this.rentRepository.updateById(id, rent);
  }

  @put('/rents/{id}')
  @response(204, {
    description: 'Rent PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rent: Rent,
  ): Promise<void> {
    await this.rentRepository.replaceById(id, rent);
  }

  @del('/rents/{id}')
  @response(204, {
    description: 'Rent DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rentRepository.deleteById(id);
  }
}

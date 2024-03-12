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
import {Gallary} from '../models';
import {GallaryRepository} from '../repositories';

export class GallaryController {
  constructor(
    @repository(GallaryRepository)
    public gallaryRepository : GallaryRepository,
  ) {}

  @post('/gallaries')
  @response(200, {
    description: 'Gallary model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gallary)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gallary, {
            title: 'NewGallary',
            exclude: ['id'],
          }),
        },
      },
    })
    gallary: Omit<Gallary, 'id'>,
  ): Promise<Gallary> {
    return this.gallaryRepository.create(gallary);
  }

  @get('/gallaries/count')
  @response(200, {
    description: 'Gallary model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gallary) where?: Where<Gallary>,
  ): Promise<Count> {
    return this.gallaryRepository.count(where);
  }

  @get('/gallaries')
  @response(200, {
    description: 'Array of Gallary model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gallary, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gallary) filter?: Filter<Gallary>,
  ): Promise<Gallary[]> {
    return this.gallaryRepository.find(filter);
  }

  @patch('/gallaries')
  @response(200, {
    description: 'Gallary PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gallary, {partial: true}),
        },
      },
    })
    gallary: Gallary,
    @param.where(Gallary) where?: Where<Gallary>,
  ): Promise<Count> {
    return this.gallaryRepository.updateAll(gallary, where);
  }

  @get('/gallaries/{id}')
  @response(200, {
    description: 'Gallary model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gallary, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gallary, {exclude: 'where'}) filter?: FilterExcludingWhere<Gallary>
  ): Promise<Gallary> {
    return this.gallaryRepository.findById(id, filter);
  }

  @patch('/gallaries/{id}')
  @response(204, {
    description: 'Gallary PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gallary, {partial: true}),
        },
      },
    })
    gallary: Gallary,
  ): Promise<void> {
    await this.gallaryRepository.updateById(id, gallary);
  }

  @put('/gallaries/{id}')
  @response(204, {
    description: 'Gallary PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gallary: Gallary,
  ): Promise<void> {
    await this.gallaryRepository.replaceById(id, gallary);
  }

  @del('/gallaries/{id}')
  @response(204, {
    description: 'Gallary DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gallaryRepository.deleteById(id);
  }
}

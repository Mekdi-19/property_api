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
import {Username} from '../models';
import {UsernameRepository} from '../repositories';

export class UsernameController {
  constructor(
    @repository(UsernameRepository)
    public usernameRepository : UsernameRepository,
  ) {}

  @post('/usernames')
  @response(200, {
    description: 'Username model instance',
    content: {'application/json': {schema: getModelSchemaRef(Username)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Username, {
            title: 'NewUsername',
            exclude: ['id'],
          }),
        },
      },
    })
    username: Omit<Username, 'id'>,
  ): Promise<Username> {
    return this.usernameRepository.create(username);
  }

  @get('/usernames/count')
  @response(200, {
    description: 'Username model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Username) where?: Where<Username>,
  ): Promise<Count> {
    return this.usernameRepository.count(where);
  }

  @get('/usernames')
  @response(200, {
    description: 'Array of Username model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Username, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Username) filter?: Filter<Username>,
  ): Promise<Username[]> {
    return this.usernameRepository.find(filter);
  }

  @patch('/usernames')
  @response(200, {
    description: 'Username PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Username, {partial: true}),
        },
      },
    })
    username: Username,
    @param.where(Username) where?: Where<Username>,
  ): Promise<Count> {
    return this.usernameRepository.updateAll(username, where);
  }

  @get('/usernames/{id}')
  @response(200, {
    description: 'Username model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Username, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Username, {exclude: 'where'}) filter?: FilterExcludingWhere<Username>
  ): Promise<Username> {
    return this.usernameRepository.findById(id, filter);
  }

  @patch('/usernames/{id}')
  @response(204, {
    description: 'Username PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Username, {partial: true}),
        },
      },
    })
    username: Username,
  ): Promise<void> {
    await this.usernameRepository.updateById(id, username);
  }

  @put('/usernames/{id}')
  @response(204, {
    description: 'Username PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() username: Username,
  ): Promise<void> {
    await this.usernameRepository.replaceById(id, username);
  }

  @del('/usernames/{id}')
  @response(204, {
    description: 'Username DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usernameRepository.deleteById(id);
  }
}

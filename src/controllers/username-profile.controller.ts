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
  Profile,
} from '../models';
import {UsernameRepository} from '../repositories';

export class UsernameProfileController {
  constructor(
    @repository(UsernameRepository) protected usernameRepository: UsernameRepository,
  ) { }

  @get('/usernames/{id}/profile', {
    responses: {
      '200': {
        description: 'Username has one Profile',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Profile),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Profile>,
  ): Promise<Profile> {
    return this.usernameRepository.profile(id).get(filter);
  }

  @post('/usernames/{id}/profile', {
    responses: {
      '200': {
        description: 'Username model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profile)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Username.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {
            title: 'NewProfileInUsername',
            exclude: ['id'],
            optional: ['usernameId']
          }),
        },
      },
    }) profile: Omit<Profile, 'id'>,
  ): Promise<Profile> {
    return this.usernameRepository.profile(id).create(profile);
  }

  @patch('/usernames/{id}/profile', {
    responses: {
      '200': {
        description: 'Username.Profile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Partial<Profile>,
    @param.query.object('where', getWhereSchemaFor(Profile)) where?: Where<Profile>,
  ): Promise<Count> {
    return this.usernameRepository.profile(id).patch(profile, where);
  }

  @del('/usernames/{id}/profile', {
    responses: {
      '200': {
        description: 'Username.Profile DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Profile)) where?: Where<Profile>,
  ): Promise<Count> {
    return this.usernameRepository.profile(id).delete(where);
  }
}

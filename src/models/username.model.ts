import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Profile} from './profile.model';
import {Property} from './property.model';

@model()
export class Username extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasOne(() => Profile)
  profile: Profile;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<Username>) {
    super(data);
  }
}

export interface UsernameRelations {
  // describe navigational properties here
}

export type UsernameWithRelations = Username & UsernameRelations;

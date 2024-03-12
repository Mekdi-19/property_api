import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Rent} from './rent.model';
import {Location} from './location.model';
import {Gallary} from './gallary.model';

@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  category: string[];

  @property({
    type: 'string',
    required: true,
  })
  description: string;
  @property({
    type: 'number',
    required: true,
  })
  number_of_bedroom: number;

  @property({
    type: 'number',
    required: true,
  })
  number_of_bathroom: number;

  @property({
    type: 'number',
    required: true,
  })
  total_area: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
  })
  images: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  additional_future: string[];

  @property({
    type: 'string',
  })
  usernameId?: string;

  @hasMany(() => Rent)
  rents: Rent[];

  @hasOne(() => Location)
  location: Location;

  @hasMany(() => Gallary)
  gallaries: Gallary[];

  @property({
    type: 'string',
  })
  locationId?: string;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;

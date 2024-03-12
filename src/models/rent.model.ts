import {Entity, model, property} from '@loopback/repository';

@model()
export class Rent extends Entity {
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
  aggrement: string;

  @property({
    type: 'string',
    required: true,
  })
  tenate: string;

  @property({
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
    required: true,
  })
  rental_history: string;

  @property({
    type: 'string',
  })
  propertyId?: string;

  constructor(data?: Partial<Rent>) {
    super(data);
  }
}

export interface RentRelations {
  // describe navigational properties here
}

export type RentWithRelations = Rent & RentRelations;

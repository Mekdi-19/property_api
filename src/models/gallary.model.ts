import {Entity, model, property} from '@loopback/repository';

@model()
export class Gallary extends Entity {
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
  images_url: string[];

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  propertyId?: string;

  constructor(data?: Partial<Gallary>) {
    super(data);
  }
}

export interface GallaryRelations {
  // describe navigational properties here
}

export type GallaryWithRelations = Gallary & GallaryRelations;

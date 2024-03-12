import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'property_rent',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/property_rent',
  host: 'localhost',
  port: 27017,
  database: 'property_rent',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PropertyRentDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'property_rent';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.property_rent', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

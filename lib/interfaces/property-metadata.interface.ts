import {
  FactoryValueGenerator,
  FactoryValue,
} from '../decorators/factory.decorator';

export interface PropertyMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Function;
  propertyKey: string;
  arg: FactoryValueGenerator | FactoryValue;
}

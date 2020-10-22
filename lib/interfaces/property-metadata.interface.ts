import {
  FactoryValueGenerator,
  FactoryValue,
} from '../decorators/factory.decorator';

export interface PropertyMetadata<T = void> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Function;
  propertyKey: string;
  arg: FactoryValueGenerator<T> | FactoryValue;
}

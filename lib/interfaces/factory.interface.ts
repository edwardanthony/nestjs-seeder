import { FactoryValue } from '../decorators/factory.decorator';

export interface Factory {
  generate<T = void>(count: number, context?: T): Record<string, FactoryValue>[];
}

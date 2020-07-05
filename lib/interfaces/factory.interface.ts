import { FactoryValue } from '../decorators/factory.decorator';

export interface Factory {
  generate(count: number): Record<string, FactoryValue>[];
}

import { FactoryMetadataStorage } from '../storages/factory.metadata.storage';

type BaseType = string | number | Date | Buffer | boolean | Record<string, any>;
export type FactoryValue = BaseType | Array<BaseType>;
export type FactoryValueGenerator<T> = (faker?: Faker.FakerStatic, context?: T) => FactoryValue;

export function Factory<T>(arg: FactoryValueGenerator<T & Record<string, any>> | FactoryValue) {
  return (target: Record<string, any>, propertyKey: string | symbol): void => {
    FactoryMetadataStorage.addPropertyMetadata({
      target: target.constructor,
      propertyKey: propertyKey as string,
      arg,
    });
  };
}

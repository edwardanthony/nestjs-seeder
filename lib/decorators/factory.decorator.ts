import { FactoryMetadataStorage } from '../storages/factory.metadata.storage';

type BaseType = string | number | Date | Buffer | boolean | Record<string, any>;
export type FactoryValue = BaseType | Array<BaseType>;
export type FactoryValueGenerator = (faker?: Faker.FakerStatic) => FactoryValue;

export function Factory(arg: FactoryValueGenerator | FactoryValue) {
  return (target: Record<string, any>, propertyKey: string | symbol): void => {
    FactoryMetadataStorage.addPropertyMetadata({
      target: target.constructor,
      propertyKey: propertyKey as string,
      arg,
    });
  };
}

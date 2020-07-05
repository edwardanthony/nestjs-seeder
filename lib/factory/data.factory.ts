import { Type } from '@nestjs/common';
import { Factory, PropertyMetadata } from '../interfaces';
import { FactoryValue } from '../decorators/factory.decorator';
import { FactoryMetadataStorage } from '../storages/factory.metadata.storage';
import * as faker from 'faker';

export class DataFactory {
  static createForClass(target: Type<unknown>): Factory {
    if (!target) {
      throw new Error(
        `Target class "${target}" passed in to the "TemplateFactory#createForClass()" method is "undefined".`,
      );
    }

    const properties = FactoryMetadataStorage.getPropertyMetadatasByTarget(
      target,
    );

    return {
      generate: (count: number): Record<string, FactoryValue>[] => {
        const ret = Array<Record<string, FactoryValue>>();
        for (let i = 0; i < count; i++) {
          ret.push(this.generate(properties));
        }
        return ret;
      },
    };
  }

  private static generate(
    properties: PropertyMetadata[],
  ): Record<string, FactoryValue> {
    return properties.reduce(
      (r, p) => ({
        [p.propertyKey]: typeof p.arg === 'function' ? p.arg(faker) : p.arg,
        ...r,
      }),
      {},
    );
  }
}

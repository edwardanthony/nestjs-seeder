import { Type } from "@nestjs/common";
import { Factory, PropertyMetadata } from "../interfaces";
import { FactoryValue } from "../decorators/factory.decorator";
import { FactoryMetadataStorage } from "../storages/factory.metadata.storage";
import { faker } from "@faker-js/faker";

export class DataFactory {
  static createForClass(target: Type<unknown>): Factory {
    if (!target) {
      throw new Error(
        `Target class "${target}" passed in to the "TemplateFactory#createForClass()" method is "undefined".`
      );
    }

    const properties =
      FactoryMetadataStorage.getPropertyMetadatasByTarget(target);

    return {
      generate: (
        count: number,
        values: Record<string, any> = {}
      ): Record<string, FactoryValue>[] => {
        const ret = Array<Record<string, FactoryValue>>();
        for (let i = 0; i < count; i++) {
          ret.push(this.generate(properties, values, i));
        }
        return ret;
      },
    };
  }

  private static generate(
    properties: PropertyMetadata[],
    values: Record<string, any>,
    index: number
  ): Record<string, FactoryValue> {
    const ctx = { ...values };
    return properties.reduce(
      (r, p) => ({
        [p.propertyKey]: (ctx[p.propertyKey] =
          typeof p.arg === "function" ? p.arg(faker, ctx, index) : p.arg),
        ...r,
      }),
      {}
    );
  }
}

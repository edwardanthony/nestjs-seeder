import { NestFactory } from "@nestjs/core";
import { SeederModule, SeederModuleOptions } from "./seeder.module";
import { SeederService } from "./seeder.service";
import { Seeder } from "./seeder.interface";
import {
  Provider,
  Type,
  DynamicModule,
  ForwardReference,
} from "@nestjs/common";

export interface SeederOptions {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  providers?: Provider[];
}

export interface SeederRunner {
  run(seeders: Provider<Seeder>[]): Promise<void>;
}

async function bootstrap(options: SeederModuleOptions) {
  const app = await NestFactory.createApplicationContext(
    SeederModule.register(options)
  );
  const seedersService = app.get(SeederService);
  await seedersService.run();

  await app.close();
}

export const seeder = (options: SeederOptions): SeederRunner => {
  return {
    run(seeders: Provider<Seeder>[]): Promise<void> {
      return bootstrap({
        ...options,
        seeders,
      });
    },
  };
};

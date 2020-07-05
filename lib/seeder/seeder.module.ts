import {
  Module,
  DynamicModule,
  Provider,
  Type,
  ForwardReference,
} from '@nestjs/common';
import { Seeder } from './seeder.interface';
import { SeederService } from './seeder.service';

export interface SeederModuleOptions {
  seeders: Provider<Seeder>[];
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  providers?: Provider[];
}

@Module({})
export class SeederModule {
  static register(options: SeederModuleOptions): DynamicModule {
    return {
      module: SeederModule,
      imports: options.imports || [],
      providers: [
        ...(options.providers || []),
        ...options.seeders,
        {
          provide: SeederService,
          useFactory: (...seeders: Seeder[]): SeederService => {
            return new SeederService(seeders);
          },
          inject: options.seeders as Type<any>[],
        },
      ],
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Seeder } from './seeder.interface';

@Injectable()
export class SeederService {
  constructor(private readonly seeders: Seeder[]) {}

  async run(): Promise<any> {
    const promises = this.getPromises() || [this.seed()];
    return Promise.all(promises);
  }

  async seed(): Promise<any> {
    // Don't use `Promise.all` during insertion.
    // `Promise.all` will run all promises in parallel which is not what we want.
    for (const seeder of this.seeders) {
      await seeder.seed();
      console.log(`${seeder.constructor.name} completed`);
    }
  }

  async drop(): Promise<any> {
    return Promise.all(this.seeders.map(s => s.drop()));
  }

  getPromises(): Promise<any>[] {
      if(this.shouldRefresh()) return [this.drop().then(() => this.seed())];
      if(this.shouldDrop()) return [this.drop()];
  }
  shouldRefresh() {
      const argv = process.argv;
      return argv.includes('-r') || argv.includes('--refresh');
  }
  shouldDrop() {
      const argv = process.argv;
      return argv.includes('-d') || argv.includes('--drop');
  }
}

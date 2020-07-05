export interface Seeder {
  seed(): Promise<any>;
  drop(): Promise<any>;
}

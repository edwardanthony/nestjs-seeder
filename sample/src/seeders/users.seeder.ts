import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    // Notice that we can optionally pass values that will be accessible in
    // the context that's passed to the @Factory decorator.
    const users = DataFactory.createForClass(User).generate(10, { zipCode: '10153' });

    // Insert into the database.
    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Seeder, DataFactory } from '../../../lib';

export interface UserSeederContext {
  gender: number;
}

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(User).generate<UserSeederContext>(
      10,
      { gender: 1 },
    );

    // Insert into the database.
    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserSeederContext } from '../seeders/users.seeder';
import { Factory } from '../../../lib';

@Schema()
export class User extends Document {
  // @Factory will automatically inject faker to the function you that you pass.
  @Factory<UserSeederContext>((faker, ctx) => ({
    first: faker.name.firstName(ctx.gender),
    last: faker.name.lastName(ctx.gender),
  }))
  @Prop(
    raw({
      first: { type: String, required: true },
      last: { type: String, required: true },
    }),
  )
  name: Record<string, string>;

  // You could also use custom function without faker.
  @Factory(() => {
    const minAge = 18;
    const maxAge = 30;
    return Math.round(Math.random() * (maxAge - minAge) + minAge);
  })
  @Prop({ required: true })
  age: number;

  // You could also use static value.
  @Factory('male')
  @Prop({ required: true })
  gender: string;

  @Factory(faker => faker.address.streetAddress())
  @Prop({ required: true })
  address: string;

  // You could also access previous values.
  @Factory((_, ctx) => `${ctx.first} ${ctx.last}, ${ctx.address}`)
  @Prop({ required: true })
  fullAddress: string;

  @Factory(
    (_, ctx) => `${ctx.name.first} ${ctx.name.last}, ${ctx.age} ${ctx.gender}`,
  )
  @Prop({ required: true })
  personInfo: string;
}

export const userSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema()
export class User extends Document {
  // @Factory will automatically inject faker to the function you that you pass.
  @Factory(faker => ({
    first: faker.name.firstName(),
    last: faker.name.lastName(),
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
    return Math.random() * (maxAge - minAge) + minAge;
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
}

export const userSchema = SchemaFactory.createForClass(User);

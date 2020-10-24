import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema()
export class User extends Document {
  // @Factory will automatically inject faker to the function that you pass.
  @Factory(faker => faker.random.arrayElement(['male', 'female']))
  @Prop({ required: true })
  gender: string;

  // You could get the previously generated value using the passed context.
  @Factory((faker, ctx) => ({
    first: faker.name.firstName(ctx.gender === 'male' ? 0 : 1),
    last: faker.name.lastName(ctx.gender === 'male' ? 0 : 1),
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
  @Factory('admin')
  @Prop({ required: true })
  role: string; 

  // If you pass predefined values to the `generate` function, you will be 
  // able to access it in the context.
  @Factory((faker, ctx) => `${faker.address.streetAddress()} ${ctx.zipCode}`)
  @Prop({ required: true })
  address: string;
}

export const userSchema = SchemaFactory.createForClass(User);

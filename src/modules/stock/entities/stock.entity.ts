import { Field, ObjectType, Float } from '@nestjs/graphql';

// Defining a GraphQL object type for representing stock information
@ObjectType({ description: 'Stock' })
export class Stock {
  @Field(() => String)
  id: string;

  @Field(() => String)
  ticker: string;

  @Field(() => Float)
  open: number;

  @Field(() => Float)
  high: number;

  @Field(() => Float)
  low: number;

  @Field(() => Float)
  close: number;

  @Field(() => Float)
  volume: number;

  @Field(() => String)
  date: string;
}

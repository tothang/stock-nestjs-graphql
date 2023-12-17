import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

export enum Interval {
  ONE_MINUTE = '1min',
  FIFTEEN_MINUTES = '15min',
  THIRTY_MINUTES = '30min',
}

registerEnumType(Interval, {
  name: 'Interval',
  description: 'The stock data interval',
});

@InputType()
export class GetStockPriceInput {
  @Field({ nullable: true })
  ticker?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  @IsEnum(Interval)
  interval: string;
}
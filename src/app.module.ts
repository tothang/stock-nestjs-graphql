import { ConfigService } from '@config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { StockModule } from './modules/stock/stock.module';
import { join } from 'path';

@Module({
  imports: [
    StockModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: ConfigService.getInstance().httpTimeout,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {}

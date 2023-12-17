import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import { ConfigService } from '@config';
import useragent from 'express-useragent';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(useragent.express());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*', origin: '*' });
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(ConfigService.getInstance().get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

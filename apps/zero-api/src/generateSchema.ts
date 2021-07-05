import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const generateSchema = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app = module.createNestApplication(null, { logger: false });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Energy Web Zero API')
    .setVersion('0.3')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync(resolve(__dirname, '..', 'swagger.json'), JSON.stringify(document, null, 2));
};

generateSchema().catch((err) => {
  console.error(err);
  process.exit(1);
});

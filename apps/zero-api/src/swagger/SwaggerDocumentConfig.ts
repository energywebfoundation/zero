import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerDocumentationConfig() {
  return new DocumentBuilder()
    .setTitle('Energy Web Zero API')
    .setVersion('0.3')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addServer(`http://localhost:${process.env.PORT}`)
    .build();
}

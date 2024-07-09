// src/modules/app.module.ts
import { Module } from '@nestjs/common';
// import { EsignModule } from './esign/esign.module';
import { EsignModule } from './modules/esign/esign.module';

@Module({
  imports: [EsignModule],
})
export class AppModule {}

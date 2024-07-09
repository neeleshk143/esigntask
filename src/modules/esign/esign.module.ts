// src/modules/esign/esign.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EsignController } from 'src/infrastructure/controllers/esign.controller';
import { EsignService } from 'src/application/services/esign.service';

@Module({
  imports: [HttpModule],
  controllers: [EsignController],
  providers: [
    {
      provide: 'EsignService',
      useClass: EsignService,
    },
  ],
})
export class EsignModule {}

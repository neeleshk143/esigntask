import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { EsignController } from './infrastructure/controllers/esign.controller';
import { EsignService } from './application/services/esign.service';
import { HttpModule } from '@nestjs/axios';
// import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [EsignController],
  providers: [EsignService],
})
export class AppModule {}

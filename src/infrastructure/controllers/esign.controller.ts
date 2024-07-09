import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreateEsignDto } from 'src/application/dtos/create-esign.dto';
import { EsignService } from 'src/application/services/esign.service';

@Controller('esign')
export class EsignController {
  constructor(private readonly esignService: EsignService) {}

  @Post()
  async createEsign(@Body() createEsignDto: CreateEsignDto) {
    return this.esignService.createEsign(createEsignDto);
  }

  @Post(':id/submit')
  async submitEsign(@Param('id') id: string) {
    return this.esignService.submitEsign(id);
  }

  @Get(':id/preview')
  async previewEsign(@Param('id') id: string) {
    return { message: 'Preview endpoint' };
  }
}

// src/application/services/esign.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IEsignService } from '../interfaces/esign-service.interface';
import { CreateEsignDto } from '../dtos/create-esign.dto';
import { Esign } from 'src/domain/models/esign.model';
import { PDFDocument, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as FormData from 'form-data';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EsignService implements IEsignService {
  private readonly ZOHO_API_URL = 'https://sign.zoho.com/api/v1';
  private readonly accessToken = process.env.ZOHO_ACCESS_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  async createEsign(dto: CreateEsignDto): Promise<Esign> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Add eSign tags
    dto.esignTags.forEach(tag => {
      if (tag.type === 'signature') {
        page.drawRectangle({
          x: tag.x,
          y: tag.y,
          width: tag.width,
          height: tag.height,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    const pdfPath = `\Users\Sajar Malik\Downloads${dto.userId}-NEELESH KUMAR AHIRWAR-April-2024.pdf`;
    C:
    fs.writeFileSync(pdfPath, pdfBytes);

    return new Esign(
      'unique-id',
      dto.userId,
      pdfPath,
      dto.esignTags,
      'created',
      dto.recipientName,
      dto.recipientEmail
    );
  }

  async submitEsign(id: string): Promise<any> {
    const esign = await this.findEsignById(id);
    if (!esign) {
      throw new Error('Esign not found');
    }

    const requestJson = {
      request_name: 'testDoc',
      expiration_days: 10,
      is_sequential: true,
      notes: 'Sign the document',
    };

    const data = { requests: requestJson };
    const payload = new FormData();
    payload.append('file', fs.createReadStream(esign.pdfUrl));
    payload.append('data', JSON.stringify(data));

    const HEADERS = {
      Authorization: 'Zoho-oauthtoken ' + this.accessToken,
    };

    const uploadResponse = await axios.post(
      `${this.ZOHO_API_URL}/requests`,
      payload,
      { headers: HEADERS }
    );

    if (uploadResponse.status !== 200) {
      throw new Error('Failed to upload document');
    }

    const request_id = uploadResponse.data.requests.request_id;
    console.log("request_id  0------- ",request_id)
    const actionsJson = {
        request_id,
      verify_recipient: false,
      recipient_name: esign.recipientName,
      recipient_email: esign.recipientEmail,
      action_type: 'SIGN',
      signing_order: 0,
    };

    const submitData = {
      requests: {
        actions: [actionsJson],
      },
    };

    const submitPayload = new FormData();
    submitPayload.append('data', JSON.stringify(submitData));

    const submitResponse = await axios.post(
      `${this.ZOHO_API_URL}/requests/${request_id}/submit`,
      submitPayload,
      { headers: HEADERS }
    );

    if (submitResponse.status !== 200) {
      throw new Error('Failed to submit document for eSign');
    }

    return submitResponse.data.requests;
  }

  private async findEsignById(id: string): Promise<Esign> {
    return new Esign(
      id,
      'user-id',
      'pdf/NEELESH KUMAR AHIRWAR-April-2024.pdf',
      [],
      'submit',
      'Neelesh Ahirwar',
      'aneelesh342@gmail.com'
    );
  }
}

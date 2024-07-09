// src/application/dtos/create-esign.dto.ts
export class CreateEsignDto {
    userId: string;
    recipientName: string;
    recipientEmail: string;
    esignTags: Array<{ type: string; x: number; y: number; width: number; height: number }>;
  }
  
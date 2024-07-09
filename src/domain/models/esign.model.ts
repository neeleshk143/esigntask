// src/domain/models/esign.model.ts
export class Esign {
    constructor(
      public id: string,
      public userId: string,
      public pdfUrl: string,
      public esignTags: any[],
      public status: string,
      public recipientName?: string,
      public recipientEmail?: string,
    ) {}
  }
  
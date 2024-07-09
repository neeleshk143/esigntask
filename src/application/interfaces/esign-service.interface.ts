import { CreateEsignDto } from "../dtos/create-esign.dto";

// src/application/interfaces/esign-service.interface.ts
export interface IEsignService {
    createEsign(dto: CreateEsignDto): Promise<any>;
    submitEsign(id: string): Promise<any>;
  }
  
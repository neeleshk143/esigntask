import { Esign } from "../models/esign.model";

// src/domain/repositories/esign-repository.interface.ts
export interface IEsignRepository {
    save(esign: Esign): Promise<Esign>;
    findById(id: string): Promise<Esign>;
  }
  
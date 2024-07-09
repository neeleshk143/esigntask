// src/infrastructure/providers/esign.provider.ts
import { Provider } from '@nestjs/common';
import { EsignService } from 'src/application/services/esign.service';

export const esignProviders: Provider[] = [
  {
    provide: 'IEsignService',
    useClass: EsignService,
  },
];

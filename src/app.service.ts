import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  rootIndex() {
    return 'Zekais';
  }
}

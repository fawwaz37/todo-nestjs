import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('landing')
  root() {
    const name = this.appService.rootIndex();
    return { name };
  }
}

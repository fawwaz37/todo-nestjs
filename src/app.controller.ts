import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('landing')
  root() {
    let date = new Date();
    let weekday = new Array(7);
    weekday[0] = 'Sunday 🖖';
    weekday[1] = 'Monday 💪😀';
    weekday[2] = 'Tuesday 😜';
    weekday[3] = 'Wednesday 😌☕️';
    weekday[4] = 'Thursday 🤗';
    weekday[5] = 'Friday 🍻';
    weekday[6] = 'Saturday 😴';

    let day = weekday[date.getDay()];

    var randomWordArray = Array(
      "Oh my, it's ",
      "Whoop, it's ",
      'Happy ',
      "Seems it's ",
      "Awesome, it's ",
      'Have a nice ',
      'Happy fabulous ',
      'Enjoy your ',
    );
    var randomWord =
      randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

    return { day, randomWord, test: 'a' };
  }
}

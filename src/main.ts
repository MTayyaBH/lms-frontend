import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as AOS from 'aos';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  AOS.init({
    offset: 10,
    delay: 0,
    duration: 2000,
    easing: 'ease',
    once: false, 
    mirror: false, 
  });
  setTimeout(() => {
    AOS.refresh();
  }, 0);
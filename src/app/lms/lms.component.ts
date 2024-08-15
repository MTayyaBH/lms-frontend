import { Component } from '@angular/core';

@Component({
  selector: 'app-lms',
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.css']
})
export class LMSComponent {
  array = [1, 2, 3, 4, 5, 6, 7];
  backgroundUrl:string='../../assets/images/kashmeer.gif'
  backgroundImages: any=[
    '../../assets/images/naran.gif',
    '../../assets/images/awaat.gif',
    '../../assets/images/hunza.gif',
    '../../assets/images/skardu.gif',
    '../../assets/images/kashmeer.gif'
  ]
  startBackgroundSlider(): void {
    let currentIndex: number = 0;
    const changeBackground = (): void => {
      this.backgroundUrl = this.backgroundImages[currentIndex];
      currentIndex = (currentIndex + 1) % this.backgroundImages.length;
    };
    changeBackground();
    setInterval(changeBackground, 3000);
  }
}

import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import confetti from 'canvas-confetti';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: DbServiceService) {}
  userdata: any = localStorage.getItem('userdata');
  login: boolean = false;

  ngOnInit() {
    this.sharedService.notify.subscribe(() => {
      this.checklogin();
    });
    this.checklogin();
    this.handleClick();
  }

  checklogin() {
    const data = localStorage.getItem('userdata');
    this.login = !!data;
  }

  handleClick() {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }
}

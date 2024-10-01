import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';


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
    this.startTypingAnimation();
  }

  checklogin() {
    const data = localStorage.getItem('userdata');
    this.login = !!data;
  }


  phrases: string[] = [
    'Training Platform!',
    'Education Excellence!',
    'Knowledge Awaits!',
    'Future Ready!',
    'Learn and Grow!',
    'Empower Minds!'
];
  currentPhraseIndex: number = 0; 
  displayedText: string = 'Welcome to the Education and'; 
  typingInterval: any;
  duration: number = 170; 
  isDeleting: boolean = false; 
  private i: number = 0; 
  
  startTypingAnimation(): void {
    this.typingInterval = setInterval(() => {
      const currentPhrase = this.phrases[this.currentPhraseIndex];
      if (!this.isDeleting) {
        if (this.i < currentPhrase.length) {
          this.displayedText = 'Welcome to the Education and ' + currentPhrase.substring(0, this.i + 1);
          this.i++;
        } else {
          this.isDeleting = true;
          setTimeout(() => this.startDeleting(), 1300); 
        }
      }
    }, this.duration);
  }
  
  startDeleting(): void {
    this.typingInterval = setInterval(() => {
      if (this.isDeleting) {
        if (this.i > 0) {
          this.displayedText = 'Welcome to the Education and ' + this.phrases[this.currentPhraseIndex].substring(0, this.i - 1);
          this.i--;
        } else {
          clearInterval(this.typingInterval);
          this.isDeleting = false;
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          this.i = 0; 
          setTimeout(() => this.startTypingAnimation(), 1300); 
        }
      }
    }, this.duration / 2); 
  }
  
  ngOnDestroy(): void {
    clearInterval(this.typingInterval); 
  }
  
}

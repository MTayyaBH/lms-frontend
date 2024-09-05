import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit {
    constructor(private service:DbServiceService) { }
     ngOnInit(): void {
      this.setInitialTheme();
    }

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    this.service.triggerNotify();
  }

  setInitialTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      (document.querySelector('input[type="checkbox"]') as HTMLInputElement).checked = true;
    }
  }
}

import { Component, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css']
})
export class CardSliderComponent implements OnInit {
  constructor(private renderer: Renderer2) { }
  isscriptload: boolean = false
  ngOnInit(): void {
    if (!this.isscriptload) {
      this.loadScript('assets/threeslider.js', () => {
        console.log('threeslider.js loaded successfully');
        this.loadScript('assets/swiper.js', () => {
          console.log('swiper.js loaded successfully');
          this.isscriptload=true
        });
      });
      this.loadStylesheet('assets/threeslider.css');
    }
  }

  private loadScript(src: string, onLoadCallback?: () => void) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = onLoadCallback || (() => { });
    this.renderer.appendChild(document.body, script);
  }

  private loadStylesheet(href: string) {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.type = 'text/css';
    this.renderer.appendChild(document.head, link);
  }
}
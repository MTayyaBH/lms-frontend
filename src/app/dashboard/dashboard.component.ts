import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private scriptElements: HTMLScriptElement[] = [];
  private linkElements: HTMLLinkElement[] = [];
  isscriptload: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    if (!this.isscriptload) {
      const scripts = [
        'assets/js/plugins/chartjs.min.js',
        // 'assets/js/plugins/Chart.extension.js',
        // 'assets/js/plugins/perfect-scrollbar.min.js',
        'assets/js/chart-1.js',
        'assets/js/chart-2.js',
        'assets/js/dropdown.js',
        'assets/js/fixed-plugin.js',
        // 'assets/js/nav-pills.js',
        'assets/js/navbar-collapse.js',
        // 'assets/js/navbar-sticky.js',
        // 'assets/js/perfect-scrollbar.js',
        // 'assets/js/sidenav-burger.js',
        'assets/js/soft-ui-dashboard-tailwind.js',
        'assets/js/soft-ui-dashboard-tailwind.min.js',
        'assets/js/tooltips.js'
      ];

      scripts.forEach(script => {
        this.loadScript(script,
          () => console.log(`${script} loaded`),
          () => console.error(`${script} failed to load`));
      });

      const stylesheets = [
        'assets/css/nucleo-svg.css',
        'assets/css/nucleo-icons.css',
        'assets/css/tooltips.css',
        // 'assets/css/perfect-scrollbar.css',
        // 'assets/css/soft-ui-dashboard-tailwind.css',
        'assets/css/soft-ui-dashboard-tailwind.min.css'
      ];

      stylesheets.forEach(stylesheet => {
        this.loadStylesheet(stylesheet);
      });

      this.isscriptload = true;  // Ensure scripts are not loaded again
    }
  }

  ngOnDestroy(): void {
    // Remove all dynamically loaded scripts
    this.scriptElements.forEach(script => {
      if (script.parentNode) {
        this.renderer.removeChild(document.body, script);
      }
    });

    // Remove all dynamically loaded stylesheets
    this.linkElements.forEach(link => {
      if (link.parentNode) {
        this.renderer.removeChild(document.head, link);
      }
    });

    console.log('All dynamically loaded scripts and stylesheets have been removed.');
  }

  private loadScript(src: string, onLoadCallback?: () => void, onErrorCallback?: () => void) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = onLoadCallback || (() => { });
    script.onerror = onErrorCallback || (() => { console.error(`Error loading script: ${src}`); });
    this.renderer.appendChild(document.body, script);

    // Store reference to script element
    this.scriptElements.push(script);
  }

  private loadStylesheet(href: string) {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.type = 'text/css';
    this.renderer.appendChild(document.head, link);

    // Store reference to link element
    this.linkElements.push(link);
  }
}

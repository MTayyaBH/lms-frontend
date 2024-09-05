import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('firstSection') firstSection!: ElementRef;
  @ViewChild('secondSection') secondSection!: ElementRef;

  private resizeListener: () => void;

  constructor(private cdr: ChangeDetectorRef) {
    this.resizeListener = this.adjustSecondSectionWidth.bind(this);
  }
  iscolse=false
  handleDataChanged(data: any) {
    console.log(data);
    this.iscolse=data
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.adjustSecondSectionWidth();
    window.addEventListener('resize', this.resizeListener);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  adjustSecondSectionWidth(): void {
    if (this.firstSection && this.secondSection) {
      requestAnimationFrame(() => {
        const firstSectionWidth = this.firstSection.nativeElement.offsetWidth;
        console.log('First Section Width:', firstSectionWidth);
        this.secondSection.nativeElement.style.width = `calc(100% - ${firstSectionWidth}px)`;
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
  isScreenMdOrGreater:boolean=false
  checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isScreenMdOrGreater = screenWidth <= 768; 
    this.iscolse = this.isScreenMdOrGreater;
  }
}

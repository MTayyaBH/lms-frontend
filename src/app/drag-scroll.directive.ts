import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective {
  private isMouseDown = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(
    private el: ElementRef,
     private renderer: Renderer2
    ) {
 
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.startX = event.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isMouseDown = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;
    const x = event.pageX - this.el.nativeElement.offsetLeft;
    const scroll = x - this.startX;
    this.el.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }
}

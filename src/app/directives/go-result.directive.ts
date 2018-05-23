import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
  selector: '[goResult]',
})

export class GoResultDirective {
  @Input('searchString') searchString: string;
  buffer: any[];
  cursor: Element;
  constructor(private el: ElementRef) {

  }

  @HostListener('click') onClick() {
    this.gotResult();
  }
  @HostListener('document:keypress', ['$event']) onEnter(event: KeyboardEvent) {
    const key = event.keyCode;
    if (key === 13) {
      this.gotResult();
    }
  }

  private gotResult() {
    if (!this.searchString) {
      this.buffer = [];
      this.cursor = undefined;
      return;
    }

    if (this.buffer === undefined) {
      this.buffer = [];
    }

    const span = document.querySelector('.article span.highlightedText');
    if (span !== undefined && this.cursor !== undefined) {
      if (span.innerHTML !== this.cursor.innerHTML) {
        this.cursor = undefined;
        this.buffer = [];
      }

    };

    if (this.cursor !== undefined) {
      if (this.cursor.classList)    {
        this.cursor.classList.remove('cursor');
      } else {
        const classes = this.cursor.className.split(' ');
        classes.splice(classes.indexOf('cursor'), 1);
        this.cursor.className = classes.join(' ');
      }
    }

    if (this.buffer.length === 0) {
      const nodeList = document.querySelectorAll('.article span.highlightedText');
      this.buffer = Array.prototype.slice.call(nodeList);
    }

    this.cursor = this.buffer.shift();
    if (this.cursor !== undefined) {
      if (this.cursor.classList)    {
        this.cursor.classList.add('cursor');
      } else {        this.cursor.className += ' cursor' ;
      }
      let cursor = this.cursor;
      cursor.id = new Date().getTime().toString();
      const cursor_el = document.getElementById(cursor.id);
      window.scrollTo(cursor_el.offsetLeft, cursor_el.offsetTop);
      cursor_el.scrollIntoView();
    }

  }
}

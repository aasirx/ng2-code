import { Component, OnInit,ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  name: string = 'Semlinker';
  @ViewChild('selectRef')
  select: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    // this.greetDiv.nativeElement.style.backgroundColor  = 'red';
    this.renderer.addClass(this.select.nativeElement, "select2-hidden-accessible");
  }

  ngOnInit() {
  }

}

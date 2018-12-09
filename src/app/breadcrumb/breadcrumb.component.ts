import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() paginas: string[] = [];
  constructor() {
    console.log(this.paginas);
    
   }

  ngOnInit() {
  }

}

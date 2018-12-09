import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() show:boolean = false;
  @Input() text:string = " Cargando ... ";
  @Input() image:string;

  constructor() { }

  ngOnInit() {
  }

}

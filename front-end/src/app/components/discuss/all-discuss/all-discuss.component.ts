import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-all-discuss',
  templateUrl: './all-discuss.component.html',
  styleUrls: ['./all-discuss.component.css']
})
export class AllDiscussComponent implements OnInit {

  @Input() discuss = {
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3'
  }

  constructor() { }

  ngOnInit(): void {
  }

}

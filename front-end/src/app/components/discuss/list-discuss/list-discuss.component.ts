import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-discuss',
  templateUrl: './list-discuss.component.html',
  styleUrls: ['./list-discuss.component.css']
})
export class ListDiscussComponent implements OnInit {
  listDiscuss = [
    {
      conteudo: 'Passo informações para o componente filho',
      autoria: 'Componente pai',
      modelo: 'modelo3'
    },
    {
      conteudo: 'Minha propriedade é decorada com @Input()',
      autoria: 'Componente filho',
      modelo: 'modelo2'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }
}

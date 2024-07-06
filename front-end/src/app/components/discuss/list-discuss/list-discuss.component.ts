import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateDiscussComponent } from '../modal-create-discuss/modal-create-discuss.component';

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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateDiscussComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
    });
}

  ngOnInit(): void {
  }
}

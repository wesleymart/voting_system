import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-discuss',
  templateUrl: './modal-create-discuss.component.html',
  styleUrls: ['./modal-create-discuss.component.css']
})
export class ModalCreateDiscussComponent {
  titulo: string = '';
  descricao: string = '';
  automatico: boolean = false;
  definirPrazo: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalCreateDiscussComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Lógica para salvar os dados
    console.log('Título:', this.titulo);
    console.log('Descrição:', this.descricao);
    console.log('Automático:', this.automatico);
    console.log('Definir prazo:', this.definirPrazo);
    this.dialogRef.close();
  }
}

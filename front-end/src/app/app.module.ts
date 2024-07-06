import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListDiscussComponent } from './components/discuss/list-discuss/list-discuss.component';
import { AllDiscussComponent } from './components/discuss/all-discuss/all-discuss.component';
import { MatInputModule,MatFormFieldModule, MatButtonModule , MatDialogModule, MatCheckboxModule } from '@angular/material';
import { ModalCreateDiscussComponent } from './components/discuss/modal-create-discuss/modal-create-discuss.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDiscussComponent,
    AllDiscussComponent,
    ModalCreateDiscussComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

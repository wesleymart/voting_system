import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListDiscussComponent } from './components/discuss/list-discuss/list-discuss.component';
import { AllDiscussComponent } from './components/discuss/all-discuss/all-discuss.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDiscussComponent,
    AllDiscussComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

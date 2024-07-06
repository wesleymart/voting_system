import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDiscussComponent } from './components/discuss/list-discuss/list-discuss.component';
import { AllDiscussComponent } from './components/discuss/all-discuss/all-discuss.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'allDiscuss',
    pathMatch: 'full'
  },
  {
    path: 'listDiscuss',
    component: ListDiscussComponent
  },
  {
    path: 'allDiscuss',
    component: AllDiscussComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

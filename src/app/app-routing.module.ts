import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {TableComponent} from "./components/table/table.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'table', component: TableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {TableComponent} from "./components/table/table.component";
import {CreateUserComponent} from "./components/create/create-user.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'table', component: TableComponent},
  {path: 'create', component: CreateUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

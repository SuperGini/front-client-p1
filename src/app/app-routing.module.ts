import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {TableComponent} from "./components/table/table.component";
import {UserCredentialContainerComponent} from "./components/createcredentials/user-credential-container.component";
import {CreateUserComponent} from "./components/createuser/create-user.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: StartComponent, pathMatch: 'full'},
  {path: 'table', component: TableComponent},
  {
    path: '', component: UserCredentialContainerComponent, children: [
      {path: 'create', component: CreateUserComponent},
      {path: 'login', component: LoginComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {MainPageComponent} from "./components/mainpage/mainPage.component";
import {UserCredentialContainerComponent} from "./components/createcredentials/user-credential-container.component";
import {CreateUserComponent} from "./components/createcredentials/createuser/create-user.component";
import {LoginComponent} from "./components/createcredentials/login/login.component";
import {FolderInfoPanelComponent} from "./components/mainpage/rightpanel/folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./components/mainpage/rightpanel/picturespanel/picturesPanel.component";

import {CreateFolderPopupComponent} from "./components/popup/createfolder/create-folder-popup.component";
import {canActivateLogin} from "./guards/AuthGuardService";


const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    pathMatch: 'full'
  },

  {
    path: 'mainPage', canActivate: [canActivateLogin],
  //  path: 'mainPage',
    component: MainPageComponent,
    children: [
      {
        path: 'info/:id',
        component: FolderInfoPanelComponent
      },
      {
        path: 'pictures/:id',
        component: PicturesPanelComponent
      },
    ]
  },

  {
    path: 'test',
    component: CreateFolderPopupComponent
  },

  {
    path: '',
    component: UserCredentialContainerComponent,
    children: [
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

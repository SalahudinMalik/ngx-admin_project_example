import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './addUser/adduser.component'
import { UserComponent } from './user.component';
import { UserListComponent } from './userList/user-list.component'

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{
      path: 'addUser',
      component: AddUserComponent,
      },
      {
        path: 'listUser',
        component: UserListComponent,
      },
      {
        path: 'showUser/:id',
        component: AddUserComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserListComponent,
  UserComponent,
  AddUserComponent,
];

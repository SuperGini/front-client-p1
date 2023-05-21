import {Action} from "@ngrx/store";
import {SecurityUser} from "../../cach/cach";

export const ADD_USER = 'ADD_USER';

export class AddUser implements Action{
    readonly type: string = ADD_USER;
    loggedUser: SecurityUser;
}



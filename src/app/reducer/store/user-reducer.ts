import {SecurityUser} from "../../cach/cach";
import {ADD_USER, AddUser} from "./user-actions";

const initialUserState = {
    securityUser: new SecurityUser('', '', 'gigel')
};


export function usernameReducer(state = initialUserState, action: AddUser) {
    switch (action.type) {
        case ADD_USER:
            return {
                state,
                securityUser: action.loggedUser
            };
        default:
            return state;
    }
}

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync(
//         {keys: ['username'],
//             rehydrate: true})(reducer);
// }

import * as CONTANTS from '../constants'
import { Person } from 'types/person';
import { Action } from '../types/payload';
const initialState: any = {}

const MainReducer = (state: Person = initialState, action: Action<string, Person>): any => {
    console.log('reducer', state, action);
    switch (action.type) {
        case CONTANTS.LIST:
            return { ...state, lists: action.payload };
        case CONTANTS.DELETE:
            return { ...state, deleteIds: action.payload };
        default:
            return state;
    }
}

export default MainReducer;
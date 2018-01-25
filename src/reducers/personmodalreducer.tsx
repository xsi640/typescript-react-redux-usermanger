import * as CONTANTS from '../constants'
import { Person } from 'types/person';
import { Action } from '../types/payload';
const initialState: any = {}

const PersonModalReducer = (state: Person = initialState, action: Action<string, Person>): any => {
    switch (action.type) {
        case CONTANTS.SAVE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default PersonModalReducer;
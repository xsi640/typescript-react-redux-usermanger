import * as CONSTANTS from '../constants'
import { Person } from '../types/person'
import { Action, createAction } from '../types/payload'
import PersonData from '../datas/index'

export function del(ids: Array<number>) {
    for (let id of ids) {
        let p: Person | undefined = PersonData.get(id);
        if (p !== undefined) {
            PersonData.remove(p);
        }
    }

    return (dispatch: Function) => {
        setTimeout(() => {
            return dispatch(createAction(CONSTANTS.DELETE, ids));
        }, 3000);
    }
}

export function list() {
    return (dispatch: Function) => {
        setTimeout(() => {
            return dispatch(createAction(CONSTANTS.LIST, PersonData.getData()))
        }, 3000);
    }
}
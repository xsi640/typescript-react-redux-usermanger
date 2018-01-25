import * as CONSTANTS from '../constants'
import { Person } from '../types/person'
import { Action, createAction } from '../types/payload'
import PersonData from '../datas/index'

export function save(person: Person) {
    PersonData.add(person);
    return (dispatch: Function) => {
        setTimeout(() => {
            dispatch(createAction(CONSTANTS.SAVE, person))
        }, 3000);
    }
}
import { Person } from "types/person";

class PersonData {
    _persons: Array<Person> = new Array();

    getData() {
        return this._persons;
    }

    getId(): number {
        let id: number = 1;
        for (let p of this._persons) {
            if (id < p.id) {
                id = p.id;
            }
        }
        id++;
        return id;
    }

    add(person: Person): void {
        let p = this.get(person.id);
        if (p == null) {
            this._persons.push(person);
        } else {
            p.name = person.name;
            p.sex = person.sex;
            p.birthday = person.birthday;
            p.age = person.age;
            p.address = person.address;
        }
    }

    remove(person: Person): void {
        let p = this.get(person.id);
        if (p !== undefined) {
            let index = this._persons.indexOf(p);
            if (index > -1) {
                this._persons.splice(index, 1);
            }
        }
    }

    get(id: number): Person | undefined {
        let result: Person | undefined = undefined;
        for (let p of this._persons) {
            if (p.id === id) {
                result = p;
                break;
            }
        }
        return result;
    }
}

const p: PersonData = new PersonData();
p.add({ id: 1, name: '张三', age: 20, birthday: new Date(), sex: 1, address: 'beijing' });

export default p;
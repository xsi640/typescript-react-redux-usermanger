import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Modal, Input, DatePicker, Radio, Alert, Button } from 'antd'
const RadioGroup = Radio.Group
import './personmodal.scss'
import { Person } from 'types/person';
import * as personModalAction from '../actions/personmodalaction'
import PersonData from '../datas/index'
import { fail } from 'assert';

interface Props {
    onClose?: (person?: Person) => void;
    save?: (person: Person) => void;
}

interface States {
    title: string,
    name: string,
    age: number,
    birthday: Date,
    sex: number,
    address: string,
    visible: boolean,
    error: string,
    loading: boolean,
}

class PersonModal extends Component<Props, States> {

    _person?: Person;

    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
            name: '',
            age: 0,
            birthday: new Date,
            sex: 0,
            address: '',
            visible: false,
            error: '',
            loading: false
        };

        this._savePerson = this._savePerson.bind(this)
        this._onClose = this._onClose.bind(this)
        this.show = this.show.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.Person !== undefined) {
            if (this.props.onClose !== undefined) {
                this.props.onClose(nextProps.Person as Person);
                this.setState({ visible: false });
            }
        }
        this.setState({ loading: false });
    }

    show(person: Person): void {
        this._person = person;
        if (person === undefined) {
            this.setState({
                title: 'Add Person',
                name: '',
                age: 0,
                birthday: new Date(),
                sex: 0,
                address: '',
                visible: true,
                error: '',
                loading: false,
            });
        } else {
            this.setState({
                title: 'Modify Person',
                name: person.name,
                age: person.age,
                birthday: person.birthday,
                sex: person.sex,
                address: person.address,
                visible: true,
                error: '',
                loading: false,
            });
        }
    }

    _validInput() {
        if (this.state.name === '') {
            this.setState({ error: 'Please Input name.' })
            return false;
        }
        if (this.state.age.toString() === '') {
            this.setState({ error: 'Please Input age.' })
            return false;
        }
        if (!/^\d+$/.test(this.state.age.toString())) {
            this.setState({ error: 'Input age error.' })
            return false;
        }
        return true;
    }

    _onClose() {
        this.setState({visible:false});
    }

    _savePerson() {
        if (!this._validInput()) {
            return;
        }
        this.setState({ loading: true });
        if (this._person === undefined) {
            let person = {
                id: PersonData.getId(),
                name: this.state.name,
                age: this.state.age,
                birthday: this.state.birthday,
                sex: this.state.sex,
                address: this.state.address
            }
            if (this.props.save !== undefined)
                this.props.save(person);
        } else {
            let person = {
                id: this._person.id,
                name: this.state.name,
                age: this.state.age,
                birthday: this.state.birthday,
                sex: this.state.sex,
                address: this.state.address
            }
            if (this.props.save !== undefined)
                this.props.save(person);
        }
    }

    render() {
        return (
            <div>
                <Modal title={this.state.title} visible={this.state.visible} closable={false}
                    footer={[
                        <Button key="back" size="large" onClick={this._onClose}>Cancel</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading}
                            onClick={this._savePerson}>
                            Save
                           </Button>,
                    ]}>
                    {
                        typeof this.state.error === 'string' && this.state.error !== '' ?
                            <Alert message={this.state.error}
                                type="error"
                                closable
                            /> : null
                    }
                    <div className="person">
                        <div>name:</div>
                        <div>
                            <Input value={this.state.name} onChange={(e) => {
                                this.setState({ name: e.target.value });
                            }} />
                        </div>
                        <div>age:</div>
                        <div>
                            <Input value={this.state.age == 0 ? '' : this.state.age} onChange={(e) => {
                                this.setState({ age: Number(e.target.value) });
                            }} />
                        </div>
                        <div>birthday:</div>
                        <div>
                            <DatePicker value={moment(this.state.birthday)} format="YYYY-MM-DD" onChange={(e) => {
                                this.setState({ birthday: e.toDate() });
                            }} allowClear={false} />
                        </div>
                        <div>sex:</div>
                        <div>
                            <RadioGroup value={this.state.sex} name="sex" onChange={(e) => {
                                this.setState({ sex: Number(e.target.value) })
                            }}>
                                <Radio value={1}>male</Radio>
                                <Radio value={2}>female</Radio>
                                <Radio value={0}>secret</Radio>
                            </RadioGroup>
                        </div>
                        <div>address：</div>
                        <div>
                            <Input value={this.state.address} onChange={(e) => {
                                this.setState({ address: e.target.value });
                            }} />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state: any): any => {
    return { Person: state.PersonModalReducer };
}

export default connect(mapStateToProps, personModalAction, null, { withRef: true })(PersonModal)
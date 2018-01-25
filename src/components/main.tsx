import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Spin } from 'antd'
import PersonModal from './personmodal'
import * as mainAction from '../actions/mainaction'
import { Person } from 'types/person';
import PersonData from '../datas/index'

interface Props {
    del?: (id: number) => void;
    list?: () => void;
}

class Main extends Component<Props, any> {

    _personModal: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            persons: new Array(),
            selectedRowKeys: []
        }

        this._closePersonModal = this._closePersonModal.bind(this);
        this._showPersonModal = this._showPersonModal.bind(this);
        this._onSelectChange = this._onSelectChange.bind(this);
        this._onModify = this._onModify.bind(this);
        this._onDelete = this._onDelete.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.lists !== undefined) {
            this.setState({
                persons: nextProps.lists,
                loading: false
            });
        }
        if (nextProps.deleteIds !== undefined) {
            for (let id of nextProps.deleteIds) {
                let obj = null;
                for (let o of this.state.persons) {
                    if (o.id === id) {
                        obj = o;
                        break;
                    }
                }
                if (obj !== null) {
                    this.state.persons.splice(this.state.data.indexOf(obj), 1)
                }
            }
            this.setState({loading: false});
        }
    }

    _onDelete() {
        if (this.props.del !== undefined) {
            this.props.del(this.state.selectedRowKeys);
            this.setState({loading: true});
        }
    }

    _onModify() {
        let id = this.state.selectedRowKeys[0];
        let person = null;
        for (let p of this.state.persons) {
            if (p.id === id) {
                person = p;
                break;
            }
        }
        this._showPersonModal(person);
    }

    _showPersonModal(person?: Person) {
        this._personModal.getWrappedInstance().show(person);
    }

    _closePersonModal(person?: Person) {
        if (person !== undefined) {
            if (this.props.list !== undefined)
                this.props.list();
        }
        this.setState({ showPersonModal: false })
    }

    _onSelectChange(selectedRowKeys: any) {
        this.setState({ selectedRowKeys })
    }

    componentDidMount() {
        if (this.props.list !== undefined) {
            this.props.list();
            this.setState({ loading: true });
        }
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const { selectedRowKeys, persons, loading } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this._onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0 && !loading;
        const isSingleSelected = selectedRowKeys.length === 1 && !loading;
        return (
            <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={(e) => { this._showPersonModal(undefined) }}>Add</Button>
                    <Button type="primary" disabled={!isSingleSelected} onClick={this._onModify}
                        style={{ marginLeft: 10 }}>Modify</Button>
                    <Button type="primary" disabled={!hasSelected} onClick={this._onDelete}
                        style={{ marginLeft: 10 }}>Delete</Button>
                </div>
                <PersonModal ref={(obj) => { this._personModal = obj }} onClose={this._closePersonModal} />
                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={persons} loading={loading} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    console.log("mapStateToProps", state.MainReducer);
    return state.MainReducer;
}

export default connect(mapStateToProps, mainAction)(Main)
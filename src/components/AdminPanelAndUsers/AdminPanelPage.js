import React, {Component} from 'react';
import UsersView from './UsersView'
import {loadAllUsers} from '../../models/user'
import { PropTypes } from 'prop-types'; 

export default class AdminPanelPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            users: [],
        }
        this.bindEventHandlers();
    }

    bindEventHandlers(){
        // Make sure event handlers have the correct context
        this.onloadSuccess = this.onloadSuccess.bind(this);
    }

    onloadSuccess(response){
        this.setState({users:response.reverse()});
    }



    componentDidMount() {        
        loadAllUsers(this.onloadSuccess);
        
    }



    render() {
        return(
            <UsersView
                users={this.state.users}
            />
        )
    }
}

AdminPanelPage.contextTypes = {
    router: PropTypes.object
};
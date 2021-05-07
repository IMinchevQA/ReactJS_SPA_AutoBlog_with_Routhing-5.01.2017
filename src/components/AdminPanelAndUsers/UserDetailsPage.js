import React, {Component} from 'react';
import {loadUserDetails} from '../../models/user';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { PropTypes } from 'prop-types'
import UserDetailsView from './UserDetails_DeleteView';

export default class UserDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {username:'', fullname:'', roles:'', isDeleted:''};
        this.bindEventHandlers();
    }

    componentDidMount(){
        loadUserDetails(this.props.params.userId, this.onloadSuccess)
    }

    bindEventHandlers(){
        this.onloadSuccess = this.onloadSuccess.bind(this);
    }
    
    onloadSuccess(response) {
        this.setState({
            userId: response._id,
            username: response.username,
            fullname: response.fullname,
            roles: response.roles,
            isDeleted: response.isDeleted
        });
    }

    backBtnClicked(event){
        event.preventDefault();
        this.props.history.goBack();
    }

    
    
    
    render(){
        return(
            <UserDetailsView
                viewName={'User details:'}
                username={this.state.username}
                fullname={this.state.fullname}
                roles={this.state.roles}
                isDeleted={this.state.isDeleted}
                deleteBtnDisplay={'none'}
                backBtnClick={this.backBtnClicked.bind(this)}
                displayBackBtn={''}
                displayDelBtn={'none'}
                displayCancelBtn={'none'}
            />
        )
    }
}

UserDetailsPage.contextTypes = {
    router: PropTypes.object
};
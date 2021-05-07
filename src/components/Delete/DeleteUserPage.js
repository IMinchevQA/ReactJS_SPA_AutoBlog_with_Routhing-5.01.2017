import React, {Component} from 'react';
import {loadUserDetails, editUser} from '../../models/user';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { PropTypes } from 'prop-types';
import UserDeleteView from '../AdminPanelAndUsers/UserDetails_DeleteView';

export default class DeleteUserPage extends Component{
    constructor(props){
        super(props);
        this.state = {username:'', fullname:'', roles:'', isDeleted:'', password:'123', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount(){
        loadUserDetails(this.props.params.userId, this.onloadSuccess)
    }

    bindEventHandlers(){
        this.onloadSuccess = this.onloadSuccess.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }

    onloadSuccess(response) {
        this.setState({
            userId: response._id,
            username: response.username,
            fullname: response.fullname,
            roles: response.roles,
            isDeleted: response.isDeleted,
            submitDisabled: false
        });
    }

    onSubmitHandler(event){
        event.preventDefault();
        // this.setState({submitDisabled: true});
        editUser(this.state.userId,
            this.state.username,
            this.state.fullname,
            this.state.roles,
            this.state.password,
            this.state.password, // this one is for the 'repeat' field
            true,
            this.onSubmitResponse,
            this);
    }

    onSubmitResponse(response, that){
        if (response !== undefined) {
            // Navigate to the Posts page;
            that.props.history.goBack();

        } else {
            // Something went wrong, let the user try again
            that.setState({submitDisabled: true});
        }
    }

    cancelBtnClicked(event){
        event.preventDefault();
        that.props.history.goBack();
    }



    
    
    
    render(){
        return(
            <UserDeleteView
                viewName={'User details:'}
                username={this.state.username}
                fullname={this.state.fullname}
                roles={this.state.roles}
                isDeleted={this.state.isDeleted}
                deleteBtnDisplay={'none'}
                cancelBtnClick={this.cancelBtnClicked.bind(this)}
                onSubmitHandler={this.onSubmitHandler}
                displayBackBtn={'none'}
                displayDelBtn={''}
                displayCancelBtn={''}
            />
        )
    }
}

DeleteUserPage.contextTypes = {
    router: PropTypes.object
};
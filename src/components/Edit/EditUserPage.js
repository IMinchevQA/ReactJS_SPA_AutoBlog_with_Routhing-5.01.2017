import React, {Component} from 'react';
import EditDeleteUserForm from './EditUserForm';
import {loadUserDetails, editUser} from '../../models/user';
import { PropTypes } from 'prop-types'; 


export default class EditUserPage extends Component{
     constructor(props){
         super(props);
         this.state = {username:'', fullname:'', roles:'', isDeleted:'', password:'', submitDisabled: true};
         this.bindEventHandlers();
     }

    componentDidMount(){
        loadUserDetails(this.props.params.userId, this.onloadSuccess)
    }

    bindEventHandlers(){
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onloadSuccess = this.onloadSuccess.bind(this)
    }

    onloadSuccess(response){
        this.setState({
            userId: response._id,
            username: response.username,
            fullname: response.fullname,
            roles: response.roles,
            isDeleted: response.isDeleted,
            submitDisabled: false
        })
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);

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
                this.state.isDeleted, 
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

    cancelEditDelete(event){
        event.preventDefault();
        this.props.history.goBack();
        // this.setState({submitDisabled: false});
    }

    render() {
        return (
            <EditDeleteUserForm
                username={this.state.username}
                fullname={this.state.fullname}
                roles={this.state.roles}
                isDeleted={this.state.isDeleted}
                submitDisabled={this.state.submitDisabled}
                onChangeHandler={this.onChangeHandler}
                onSubmitHandler={this.onSubmitHandler}
                submitButtonName={"Submit changes"}
                className={'btn btn-primary'}
                cancelButton={this.cancelEditDelete.bind(this)}

            />
        )
    }
}

EditUserPage.contextTypes = {
    router: PropTypes.object
}

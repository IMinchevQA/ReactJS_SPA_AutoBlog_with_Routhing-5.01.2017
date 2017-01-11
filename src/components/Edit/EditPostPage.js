import React, {Component} from 'react';
import EditDeletePostForm from './EditDeletePostForm';
import {loadPostDeatils, editPost} from '../../models/posts';

export default class EditPostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {postId:'', title:'', author:'', description:'', date:'', imageUrl:'', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount(){
        loadPostDeatils(this.props.params.postId, this.onloadSuccess, "edit")
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onloadSuccess = this.onloadSuccess.bind(this)
    }

    onloadSuccess(response){
        this.setState({
            postId:response._id,
            title:response.title,
            author:response.author,
            description:response.description,
            date:response.date,
            imageUrl:response.imageUrl,
            submitDisabled:false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        console.log(event.target.name)
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        // create(this.state.name, this.state.description, this.onSubmitResponse);
        editPost(this.state.postId, this.state.title, this.state.author, this.state.description, this.state.date, this.state.imageUrl, this.onSubmitResponse, this)
        
    }

    onSubmitResponse(response, that) {
        if (response !== undefined) {            
            // Navigate to the Posts page;
            that.context.router.goBack();

        } else {
            alert("TUK")
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    cancelEditDelete(event){
        event.preventDefault();
        this.context.router.goBack();
        // this.setState({submitDisabled: false});
    }

    render() {
        return (
            <div>
                <h1>Edit post page</h1>
                <EditDeletePostForm
                    postId={this.state.postId}
                    title={this.state.title}
                    author={this.state.author}
                    description={this.state.description}
                    date={this.state.date}
                    imageUrl={this.state.imageUrl}
                    //Fields -> Title, Author, Description
                    fieldsDisabled={[this.state.submitDisabled, true, this.state.submitDisabled, this.state.submitDisabled]}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    submitButtonName={"Submit changes"}
                    cancelButton={this.cancelEditDelete.bind(this)}
                    //Adding Edit button color property
                    className={'btn btn-primary'}
                />
            </div>
        );
    }
}

EditPostPage.contextTypes = {
    router: React.PropTypes.object
};
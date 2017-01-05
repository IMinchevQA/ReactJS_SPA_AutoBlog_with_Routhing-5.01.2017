import React, {Component} from 'react';
import CreatePostForm from '../Edit/EditDeletePostForm';
import {createPost} from '../../models/posts';

export default class CreatePostPage extends Component{
    constructor(props){
        super(props);
        this.state = {title:'', author:sessionStorage.getItem('username'), description:'', date:'', imageUrl:'', submitDisabled: false};
        this.bindEventHandlers();
    }
    
    bindEventHandlers(){
        //Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }
    
    onChangeHandler(event){
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);

    }
    
    onSubmitHandler(event){
        event.preventDefault();
        this.setState({submitDisabled: true});
        createPost(this.state.title, this.state.author, this.state.imageUrl, this.state.description, this.onSubmitResponse)
        
    }

    onSubmitResponse(response){
        console.log(response)
       if(response !== undefined){
           //Navigate to the posts page
           this.setState({submitDisabled: true});
           this.context.router.goBack();
       } else {
           //Something went wrong, let the user try again
           this.context.router.push('/');
       }
    }

    cancelCreatePost(event){
        event.preventDefault();
        this.context.router.goBack();
        this.setState({submitDisabled:false})
    }

    render(){
        return(
            <div>
            <h1>Create post page</h1>
            <CreatePostForm
                postId={this.state.postId}
                title={this.state.title}
                author={this.state.author}
                description={this.state.description}
                date={this.state.date}
                imageUrl={this.state.imageUrl}
                //Fields -> Title, Author, Description
                fieldsDisabled={[this.state.submitDisabled, true, this.state.submitDisabled]}
                onChangeHandler={this.onChangeHandler}
                onSubmitHandler={this.onSubmitHandler}
                submitButtonName={"Create post"}
                cancelButton={this.cancelCreatePost.bind(this)}
                //Adding Edit button color property
                className={'btn btn-lg btn-success btn-block'}
            />
            </div>
        )
    }
}



CreatePostPage.contextTypes = {
    router: React.PropTypes.object
}
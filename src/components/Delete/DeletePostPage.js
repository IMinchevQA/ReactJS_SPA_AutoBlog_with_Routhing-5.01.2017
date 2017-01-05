import React, {Component} from 'react';
import {loadPostDeatils, deletePost} from '../../models/posts';
import EditDeletePostForm from '../Edit/EditDeletePostForm';

export default class DeletePostPage extends Component{
    constructor(props){
        super(props)
        this.state = {postId:'', title:'', author:'', description:'', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount(){
        loadPostDeatils(this.props.params.postId, this.onloadSuccess, "delete")
    }

    bindEventHandlers(){
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onloadSuccess = this.onloadSuccess.bind(this);
    }

    onloadSuccess(response){
        this.setState({
            postId:response._id,
            title:response.title,
            author:response.author,
            description:response.description,
            imageUrl:response.imageUrl,
            submitDisabled:false,
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        deletePost(this.state.postId, this.onSubmitResponse, this)
        
    };

    onSubmitResponse(response, that){
        if(response[1].count === 1){
            //Navigate to the Posts page.
            that.context.router.goBack();
        } else {
            //Something went wrong, the user should refresh the page and try again.
            this.setState({submitDisabled:true});
        }
    };

    cancelEditDelete(event){
        event.preventDefault();
        this.context.router.goBack();
    }

    render(){
        return(
            <div>
                <h1>Delete post page</h1>
                <EditDeletePostForm
                    postId={this.state.postId}
                    title={this.state.title}
                    author={this.state.author}
                    description={this.state.description}
                    date={this.state.date}
                    imageUrl={this.state.imageUrl}
                    //Fields -> Title, Author, Description
                    fieldsDisabled={[true, true, true, true]}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    submitButtonName={"Delete post"}
                    cancelButton={this.cancelEditDelete.bind(this)}
                    //Adding Delete button color property
                    className={"btn btn-lg btn-danger btn-block"}
                />
            </div>
        )
    }
}

DeletePostPage.contextTypes = {
    router: React.PropTypes.object
};

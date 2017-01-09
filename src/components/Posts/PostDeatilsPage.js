import React, {Component} from 'react';
import {loadPostDeatils, addPostComment, updateLikes} from '../../models/posts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import PostDetailsView from './PostDetailsView';
import AddPostCommentForm from './AddPostCommentForm'

export default class PostDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {postId:'', title:'', author:'', description:'', imageUrl:'', date:'', comments:'', countVisited:'', likes:'', countVisitLikesId:'', submitDisabled: true, viewName:'postDetails'};

        this.bindEventsHandler();
    }
    
    componentDidMount(){
        loadPostDeatils(this.props.params.postId, this.onloadSuccess);
    }
    
    bindEventsHandler(){
        this.onloadSuccess = this.onloadSuccess.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }
    
    onloadSuccess([post, comments, countVisitsLikes]){
        this.setState({
            postId:post._id,
            title:post.title,
            author:post.author,
            description:post.description,
            imageUrl:post.imageUrl,
            date:post.date,
            comments:comments,
            countVisited:countVisitsLikes[0].countVisited,
            likes:countVisitsLikes[0].countLiked,
            countVisitLikesId:countVisitsLikes[0]._id,
            submitDisabled:false
        });
    }

    onSubmitHandler(event){
        event.preventDefault();
        addPostComment(this.state.postId, this.state.comment, sessionStorage.getItem('username'), this.onSubmitResponse);
    }

    onSubmitResponse(response){
        if(response !== undefined){
            //Navigate consecutively to the Home and to the detailsPost pages
            //Why: The new just added comment does not appear if navigate directly to the current detailsPost page!!!
            this.context.router.goBack();
            // this.context.router.push('/');
            // this.context.router.push('/detailsPost/' + this.state.postId);
        } else {
            //Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    onChangeHandler(event){
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    cancelBtnClicked(event){
        event.preventDefault();
        this.context.router.push('/detailsPost/' + this.state.postId);
        this.setState({viewName:'postDetails'})
    }

    addCommentBtnClicked(event){
        event.preventDefault();
        this.context.router.push('/detailsPost/' + this.state.postId + '/addPostComment');
        this.setState({viewName:'addPostComment'});
    }

    likeBtnClicked(event){
        event.preventDefault()
        let userId = sessionStorage.getItem('userId');
        let usersLiked = []
        if(this.state.likes[0] === "empty"){
            usersLiked.push(userId)
        } else {
            //Clone the this.state.likes to prevent undesired data change
            usersLiked = this.state.likes.map(e => e);
            usersLiked.push(userId)
        }
        updateLikes(this.state.postId, this.state.countVisited, usersLiked, this.state.countVisitLikesId, this.componentDidMount.bind(this));

    }

    backBtnClicked(event){
        event.preventDefault();
        this.context.router.goBack();
    }

    
    
    
    render(){
        let view = {
            postDetails: (<div>
                <PostDetailsView
                    postId={this.state.postId}
                    title={this.state.title}
                    author={this.state.author}
                    date={this.state.date.slice(0,28)}
                    description={this.state.description}
                    countVisited={this.state.countVisited}
                    imageUrl={this.state.imageUrl}
                    likes={this.state.likes}
                    sibmitDisabled={this.state.submitDisabled}
                    comments={this.state.comments}
                    backToPosts={this.backBtnClicked.bind(this)}
                    like={this.likeBtnClicked.bind(this)}
                    addCommentCl={this.addCommentBtnClicked.bind(this)}
                />
            </div>),
            addPostComment:(<div>
                <AddPostCommentForm
                    postId={this.state.postId}
                    title={this.state.title}
                    author={this.state.author}
                    date={this.state.date.slice(0,33)}
                    description={this.state.description}
                    countVisited={this.state.countVisited}
                    likes={this.state.likes}
                    imageUrl={this.state.imageUrl}
                    sibmitDisabled={this.state.submitDisabled}
                    comments={this.state.comments}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    backToPosts={this.cancelBtnClicked.bind(this)}
                />
            </div>)
        }[this.state.viewName]
        return(
            view
        )
    }
}

PostDetailsPage.contextTypes = {
    router: React.PropTypes.object
};
import React, { Component } from 'react';
import '../../styles/PostDetailsView.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


export default class PostDetailsView extends Component {
    render() {
        let commentsRow = [];
        let likeBtn = '';
        if(!this.props.likes.includes(sessionStorage.getItem('userId'))
            && this.props.likes !== ''){
            likeBtn = (<input className="btn btn-lg btn-success"
                              type="button"
                              value="Like"
                              onClick={this.props.like}
                              style={{marginLeft:'45px', width:'40px', height:'30px', paddingLeft:'3px', paddingTop:'2px'}}
                        />);
        }
        let cnt = 1;
        if(this.props.comments) {
            commentsRow.push(<div key={this.props.postId}><br/><span className="postContent">Comments: </span></div>);
            let comments = this.props.comments.map((comment, index) =>
                <div key={comment._id}>
                    <p><b>#{cnt++}:</b> {comment.comment}</p>
                    <p><b>Comment by:</b> {comment.commentAuthor}</p>
                    <br/>
                </div>
            );

            commentsRow.push(comments);
        } else {
            commentsRow='';
        }

        return (
            <div className="details-view">
                <input type="button" value="Back to Posts" className="btn btn-lg btn-primary"
                       onClick={this.props.backToPosts}/>
                <h1>{this.props.title}</h1>
                <b>Posted by:</b><span style={{marginLeft:'10px'}}>{this.props.author}</span>
                <br/>
                <b>Date:</b><span style={{marginLeft:'45px'}}>{this.props.date}</span>
                <br/>
                <img src={this.props.imageUrl} style={{width:'240px', height:'180px', margin:"20px"}} alt=""/>
                <div><span className="postContent">Post content:</span> 
                    <p className="cont">{this.props.description}</p>
                </div>
                <b>Times visited:</b><span style={{marginLeft:'10px'}}>{this.props.countVisited}</span><br/>
                <b>Likes:</b><span style={{marginLeft:'10px'}}>{this.props.likes[0] === "empty" ? 0 : this.props.likes.length}</span>
                    {likeBtn}
                <br/>
                <div>
                    {commentsRow}
                </div>
                {this.addComment(this.props.postId)}
            </div>
        );
    }

    addComment(postId) {
        if(sessionStorage.getItem('userId')) {
            return (
                <input type="button" value="Add comment" className="btn btn-lg btn-primary"
                       onClick={this.props.addCommentCl}/>
            );
        } else {
            return ('');
        }


    }
}



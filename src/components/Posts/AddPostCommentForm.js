import React, { Component } from 'react';


export default class AddPostCommentForm extends Component {
    render() {
        return (
            <form className="add-post-comment-form" onSubmit={this.props.onSubmitHandler}>
                <h1>Add post comment</h1>
                <h3>Title: {this.props.title}</h3><br/>
                <div><span className="postContent">Content: </span>{this.props.description}</div><br/>
                <div><span className="postContent">Author: </span>{this.props.author}</div><br/>

                <label>
                    <div><span className="postContent">Comment: </span></div>

                    <textarea
                        className="form-control"
                        name="comment"
                        rows="20"
                        cols="40"
                        required
                        onChange={this.props.onChangeHandler}
                        autoFocus="autoFocus"
                    />

                </label>
                <div>
                    <button className="btn btn-lg btn-success btn-add" type="submit">Add</button>
                    &nbsp; &nbsp; &nbsp;
                    <button className="btn btn-lg btn-primary btn-primary" type="submit" onClick={this.props.backToPosts}>Cancel</button>
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.post._id,
            this.descriptionField.value,
            this.props.commentAuthor
        );
    }
}

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class PostsView extends Component{
    render(){
        let currentPage = this.props.currentPage;
        let countPages = this.props.countPages;

        let postRows = this.props.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.description.length > 200 ? post.description.slice(0,200) + '...' : post.description}
                    <p>
                        <i>
                            <font size="1">Publish date: {post.date.slice(0,33)}</font>
                        </i>
                    </p>
                </td>
                {this.getActions(post, this.props.userId)}
            </tr>
        );

        return (
            <div className="container">
                <div className="table-responsive">
                    <h1>All Posts</h1>
                    <Link to={"/createPost"} className="btn btn-lg btn-success btn-block" style={{
                    width:'120px',
                    height:'45px',
                    margin: '10px 10px',
                    paddingLeft:'12px'}}>Create post</Link>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title:</th>
                            <th>Posted by:</th>
                            <th>Description:</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {postRows}
                        </tbody>
                    </table>
                </div>
                <div>
                    {this.pagination(countPages, currentPage)}
                </div>
            </div>
        );
    }

    getActions(post, userId) {
        let role = this.props.role;
        let editPostLink = <Link to={"/editPost/" + post._id} data-postid={post._id} className="btn btn-lg btn-primary btn-block" style={{width:'110px',
                    height:'35px', paddingTop:'5px'}}>Edit post</Link>
        let deletePostLink = <Link to={"/deletePost/" + post._id} className="btn btn-lg btn-primary btn-block" style={{width:'110px',
                    height:'35px', paddingLeft:'7px', paddingTop:'5px'}}>Delete post</Link>
        let detailsPostLink = <Link to={"/detailsPost/" + post._id} className="btn btn-lg btn-primary btn-block" style={{width:'110px',
                    height:'35px', paddingLeft:'20px', paddingTop:'5px'}}>More...</Link>

        if (post._acl.creator === userId || role === "admin" || role === "moderator") {

            return (
                <td>
                    {editPostLink}
                    {deletePostLink}
                    {detailsPostLink}
                </td>
            );
        } else {
            return (
                <td>
                    {detailsPostLink}
                </td>
            );
        }
    };

    pagination(countPages, currentPage){
        let html = [];
        if(currentPage) {
            for (let i = 1; i <= countPages; i++) {
                html.push(<Link key={i} to={"/posts/" + i} className="pagination" value={i}
                                style={{height:'30px', width:'30px', textAlign:'center', paddingTop:'5px', border: '1px solid','color': i === Number(currentPage) ? "blue" : "grey"}}
                                onClick={this.props.pageNumberClicked.bind(this.props.that, i)}>{i}</Link>)
            }

            if (currentPage > 1) {
                html.unshift(<Link key={0} to={"/posts/" + (Number(currentPage)- 1)} className="pagination" value={0}
                                   style={{height:'30px', width:'30px', textAlign:'center', paddingTop:'5px', border: '1px solid'}}
                                   onClick={this.props.pageNumberClicked.bind(this.props.that, 0)}>{'«'}</Link>)
                // html.unshift(<Link key={0} to={"/posts/" + (currentPage - 1)} className="pagination" value={'«'} style={{height:'30px', width:'30px', textAlign:'center', paddingTop:'5px'}} onClick={this.props.pageNumberClicked.bind(this.props.that, 0)}>{'«'}</Link>)
            }

            if (currentPage < countPages) {
                html.push(<Link key={countPages + 1} to={"/posts/" + (Number(currentPage) + 1)} className="pagination"
                                value={currentPage + 1}
                                style={{height:'30px', width:'30px', textAlign:'center', paddingTop:'5px', border: '1px solid'}}
                                onClick={this.props.pageNumberClicked.bind(this.props.that, (countPages + 1))}>{'»'}</Link>)
                // html.push(<span key={countPages + 1}><input type="button" value={'»'} onClick={this.props.pageNumberClicked.bind(this.props.that, countPages +1)}/></span>)
            }
        }
        return(
            html
        )
    }
}
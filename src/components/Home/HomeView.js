import React, {Component} from 'react';
import '../../styles/Forms-Style.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../styles/HomePage-Style.scss';
import {Link} from 'react-router-dom';

export default class HomeView extends Component{
    render(){
        let postsViewed = this.props.posts.map(post =>
            <article key={post._id}>
                <h2>{this.getActions(post, this.props.isLogged, 'latestPosts')}</h2>
                <p>Posted by: {post.author}</p>
                <hr/>
                <p>{post.description.slice(0,150)}</p>
                <p className="date">{post.date.slice(0, 24)}</p>
            </article>
        );
        let mostVisitedPostsList = [];
        if(this.props.isLogged === true) {
            let mostVisited = this.props.mostVisitedPosts.map((element, index) =>
                <li key={index}>{this.getActions('', this.props.isLogged, 'mostVisitedPosts', element, index)}</li>
            )
            mostVisitedPostsList = (
                <div className='most-visited-posts'>
                    <header className="recommended">
                        <h3>5 Most Viewed Posts</h3>
                    </header>
                    <hr/>
                    <div className="list-wrapper">
                        <ul className="list">
                            {mostVisited}
                        </ul>
                    </div>
                </div>
            )
        } else {
            mostVisitedPostsList = '';
        }
        return(
            <div className="home-view">
                <h1><span>Auto<span>Blog</span></span></h1>
                <div className="posts-wrapper">
                    {mostVisitedPostsList}
                    <div className="home-posts-table">
                        {postsViewed}
                    </div>
                </div>
            </div>
        )   
    }

    getActions(post, isLogged, postsRequired, element, index){
        if(!isLogged){
            return(
                post.title
            )
        } else {
            let links = (postsRequired === 'latestPosts' ?
                <Link to={"/detailsPost/" + post._id}>{post.title}</Link> :
                <Link to={"/detailsPost/" + element[0]._id}>{`Post ${index + 1} -> ${element[1].countVisited} visits `}</Link>)
            return(
                links
            )
        }

    }

}

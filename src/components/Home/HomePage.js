import React, {Component} from 'react';
import HomeVeiw from './HomeView'
import {findLatestPosts, findMostVisitedPosts} from '../../models/posts'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state ={
            latestPosts: [],
            mostVisitedPosts:[],
        }
        this.bindEventHandlers();
    }

    bindEventHandlers(){
        // Make sure event handlers have the correct context
        this.onloadLatestPostsSuccess = this.onloadLatestPostsSuccess.bind(this);
        this.onloadMostVisitedPostsSuccess = this.onloadMostVisitedPostsSuccess.bind(this);
    }

    onloadLatestPostsSuccess(response){
        this.setState({latestPosts:response});
    }

    onloadMostVisitedPostsSuccess(response){
        this.setState({mostVisitedPosts:response});
    }


    componentDidMount() {
        //Newest 5 posts
        findLatestPosts(this.onloadLatestPostsSuccess);
        if(sessionStorage.getItem('username')){
            findMostVisitedPosts(this.onloadMostVisitedPostsSuccess)
        }
    }



    render() {
        if(sessionStorage.getItem('username')){
            return(
                <HomeVeiw
                    posts={this.state.latestPosts}
                    isLogged={true}
                    mostVisitedPosts={this.state.mostVisitedPosts}
                />
            )
        } else {
            return(
                <HomeVeiw
                    posts={this.state.latestPosts}
                    isLogged={false}
                />
            )
        }


        // let message = <p>You are currently not logged in. Please, log in or register to view team options.</p>;
        // let message;
        // if (sessionStorage.getItem('username')) {
        //     console.log(sessionStorage.getItem('username'))
        //     message = <Link to={"/posts/1"}>my team</Link>
        //
        //
        //     // if (sessionStorage.getItem('teamId')) {
        //     //     // message = <Link to={"/catalog/" + sessionStorage.getItem('teamId')}>Go to my team</Link>
        //     //
        //     // } else {
        //     //     //message = <p>You are currently not a member of a team. View the <Link to="/catalog">catalog</Link> to join or create one.</p>;
        //     // }
        // }
        // console.log(message)
        // return (
        //     <div>
        //         <h1>Home Page</h1>
        //         {message}
        //     </div>
        // );
    }
}
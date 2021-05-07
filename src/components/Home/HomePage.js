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
    }
}
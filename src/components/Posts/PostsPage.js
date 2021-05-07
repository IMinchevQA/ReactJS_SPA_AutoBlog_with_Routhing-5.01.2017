import React, {Component} from 'react';
import {loadPosts} from '../../models/posts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { PropTypes } from 'prop-types';
import PostsView from './PostsView';
import '../../styles/PostsPage-Style.scss';

export default class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            startPostNumber:'',
            postsPerPage:3,
            countPages:'',
            currentPage:'',
        }
        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.onloadSuccess = this.onloadSuccess.bind(this);
    }

    onloadSuccess(response) {
        //Display posts
        let postsToDisplay = response.sort(this.sortFunction);
        let currentPage = this.props.match.params['postsPage'];
        let startPostNumber = this.state.postsPerPage*(currentPage - 1)
        let countPages = Math.ceil(Number(postsToDisplay.length) / this.state.postsPerPage);
        this.setState({posts: postsToDisplay, startPostNumber: startPostNumber, countPages:countPages, currentPage:currentPage});

    }

    sortFunction(a, b) {
        let dateA = new Date(a.date).getTime();
        let dateB = new Date(b.date).getTime();
        return Number(dateA) < Number(dateB) ? 1 : -1;
    }

    componentDidMount() {
        //Request list of posts from the server
        loadPosts(this.onloadSuccess)
    }

    //Using of componentWill mount is necessary to change the state, otherwise the state does not want to change.
    componentWillMount(pagePicked){
        this.showPageClicked(pagePicked)
        // this.showPageClicked
    }

    showPageClicked(pagePicked){
        let that = this
        switch (pagePicked){
            case 0:
                this.props.history.push('/posts/' + (Number(this.state.currentPage) - 1));
                setTimeout(() =>this.onloadSuccess(that.state.posts), 100)

                break;
            case (this.state.countPages + 1):
                this.props.history.push('/posts/' + (Number(this.state.currentPage) + 1));
                    setTimeout(()=>this.onloadSuccess(that.state.posts), 100)
                break;
            default:
                this.setState({currentPage: pagePicked, startPostNumber:this.state.postsPerPage*(pagePicked - 1)});

        }
    }

    render() {
        return (
                <PostsView
                    posts={this.state.posts.slice(this.state.startPostNumber, this.state.startPostNumber + this.state.postsPerPage)}
                    postsPerPage={this.state.postsPerPage}
                    countPages={this.state.countPages}
                    currentPage={this.state.currentPage}
                    userId={sessionStorage.getItem('userId')}
                    that={this}
                    role={sessionStorage.getItem('role')}
                    pageNumberClicked={this.componentWillMount}
                />
            )
    }
}

AllPosts.contextTypes = {
    router: PropTypes.object
}


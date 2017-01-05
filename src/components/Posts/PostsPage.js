import React, {Component} from 'react';
import {loadPosts} from '../../models/posts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import PostsView from './PostsView';

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
        let currentPage = this.props.params['postsPage'];
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
                this.context.router.push('/posts/' + (Number(this.state.currentPage) - 1));
                // this.setState({currentPage: Number(this.state.currentPage) - 1, startPostNumber: this.state.postsPerPage*(this.state.currentPage - 2)})
                //     setTimeout(function(){console.log(that.state)}, 1000);
                setTimeout(() =>this.onloadSuccess(that.state.posts), 100)

                break;
            case (this.state.countPages + 1):
                this.context.router.push('/posts/' + (Number(this.state.currentPage) + 1));
                // this.setState({currentPage: (Number(this.state.currentPage) + 1), startPostNumber: this.state.postsPerPage*(this.state.currentPage)})
                //     setTimeout(function(){console.log(that.state)}, 1000)
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
        // if(this.state.currentPage === '') {
        //     return (
        //         <PostsView
        //             posts={this.state.posts.slice(this.state.startPostNumber, this.state.startPostNumber + this.state.postsPerPage)}
        //             postsPerPage={this.state.postsPerPage}
        //             countPages={this.state.countPages}
        //             currentPage={this.state.currentPage}
        //             userId={sessionStorage.getItem('userId')}
        //             that={this}
        //             role={sessionStorage.getItem('role')}
        //             pageNumberClicked={this.componentWillMount}
        //         />
        //     )
        // } else {
        //     return(
        //         <PostsView
        //             posts={this.state.posts.slice(this.state.startPostNumber, this.state.startPostNumber + this.state.postsPerPage)}
        //             postsPerPage={this.state.postsPerPage}
        //             countPages={this.state.countPages}
        //             currentPage={this.state.currentPage}
        //             userId={sessionStorage.getItem('userId')}
        //             that={this}
        //             role={sessionStorage.getItem('role')}
        //             pageNumberClicked={this.componentWillMount}
        //         />
        //     )
        // }
    }
}

AllPosts.contextTypes = {
    router: React.PropTypes.object
}

    /*render() {
        let currentPage = this.props.currentPage;
        let countPages = this.props.countPages;
        let postRows = this.props.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.description}
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
        if (post._acl.creator === userId || role === "admin" || role === "moderator") {
            return (
                <td>
                    <input type="button" value="Edit" className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.editPostClicked.bind(this, post._id)}/>
                    &nbsp;
                    <input type="button" value="Delete" className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.deletePostClicked.bind(this, post._id)}/>
                    <input type="button" value="More..." className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
                </td>
            );
        } else {
            return (<td>
                <input type="button" value="More..." className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
            </td>);
        }
    }

    pagination(countPages, currentPage){
        let html = [];

        for(let i = 1; i <= countPages; i++) {
            html.push(<span key={i}><input type="button" value={i}  style={{border: '1px solid','color': i === currentPage ? "red" : "grey"}}
                                           onClick={this.props.pageNumberClicked.bind(this, i)}/> </span>)
        }

        return(
                html
        )
    }*/


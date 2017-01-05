import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import HomePage from './components/Home/HomePage';
import Catalog from './components/Catalog/CatalogPage';
import AllPosts from './components/Posts/PostsPage';
import EditPost from './components/Edit/EditPostPage';
import DeletePost from './components/Delete/DeletePostPage';
import CreatePost from './components/Create/CreatePostPage';
import PostDetails from './components/Posts/PostDeatilsPage';
import AddPostComment from './components/Posts/PostDeatilsPage';
import About from './components/About/AboutPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import Details from './components/Catalog/Details';
import Edit from './components/Edit/EditPage';
import Create from './components/Create/CreatePage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="catalog">
                <IndexRoute component={Catalog}/>
                <Route path=":teamId" component={Details}/>                
            </Route>
            <Route path="about" component={About}/>
            <Route path="posts/:postsPage" component={AllPosts}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="logout" component={Logout}/>
            <Route path="edit/:teamId" component={Edit}/>
            <Route path="create" component={Create}/>
            <Route path="editPost/:postId" component={EditPost}/>
            <Route path="deletePost/:postId" component={DeletePost}/>
            <Route path="detailsPost/:postId" component={PostDetails}/>
            <Route path="detailsPost/:postId/addPostComment" component={AddPostComment}/>
            <Route path="createPost" component={CreatePost}/>
        </Route>
    </Router>,
    document.getElementById('root')
);

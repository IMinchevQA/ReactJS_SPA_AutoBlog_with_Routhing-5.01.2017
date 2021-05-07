import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Users from './components/AdminPanelAndUsers/AdminPanelPage';
import EditUser from './components/Edit/EditUserPage';
import DeleteUser from './components/Delete/DeleteUserPage';
import UserDetails from './components/AdminPanelAndUsers/UserDetailsPage';
import AllPosts from './components/Posts/PostsPage';
import EditPost from './components/Edit/EditPostPage';
import DeletePost from './components/Delete/DeletePostPage';
import CreatePost from './components/Create/CreatePostPage';
import PostDetails from './components/Posts/PostDeatilsPage';
import AddPostComment from './components/Posts/PostDeatilsPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import { createBrowserHistory } from 'history';

ReactDOM.render(
    <BrowserRouter history={createBrowserHistory()}>
        <App/>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/posts/:postsPage" component={AllPosts} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/editPost/:postId" component={EditPost} />
            <Route path="/deletePost/:postId" component={DeletePost} />
            <Route path="/detailsPost/:postId" component={PostDetails} />
            <Route path="/detailsPost/:postId/addPostComment" component={AddPostComment} />
            <Route path="/createPost" component={CreatePost} />
            <Route path="/users" component={Users} />
            <Route path="/editUser/:userId" component={EditUser} />
            <Route path="/detailsUser/:userId" component={UserDetails} />
            <Route path="/deleteUser/:userId" component={DeleteUser} />
        </Switch>
        {/* </App> */}
    </BrowserRouter>,
    document.getElementById('root')
);

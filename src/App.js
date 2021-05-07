import React, {Component} from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Infobox from  './components/common/Infobox';
import { NavLink } from 'react-router-dom';
import observer from './models/observer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '' };
        observer.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount() {
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username") });
        } else {
            this.setState({ loggedIn: false, username: '' });
        }
    }    

    render() {

        let navbar = {};
        if (!this.state.loggedIn) {
            navbar = (
                    <Navbar>
                        <NavLink to="/" className="btn btn-default" activeClassName="btn btn-default active">Home</NavLink>
                        <NavLink to="/login" className="btn btn-default" activeClassName="btn btn-default active">Login</NavLink>
                        <NavLink to="/register" className="btn btn-default" activeClassName="btn btn-default active">Register</NavLink>
                    </Navbar>
                );
        } else {
            let userRole = sessionStorage.getItem('role');
            navbar = (
                <Navbar>
                    <NavLink to="/" className="btn btn-default" activeClassName="btn btn-default active">Home</NavLink>
                    <NavLink to="/users" className="btn btn-default" activeClassName="btn btn-default active"
                          style={{'display': userRole === 'admin' ||  userRole === 'moderator' ? '' : 'none'}}>Users</NavLink>
                    <NavLink to={"/posts/" + 1} className="btn btn-default" activeClassName="btn btn-default active">Posts</NavLink>
                    <NavLink to="/logout" className="btn btn-default" activeClassName="btn btn-default active">Logout</NavLink>
                </Navbar>
            );
        }

        return (
            <div className="container">
                <Header loggedIn={this.state.loggedIn} user={this.state.username}>
                    {navbar}
                </Header>
                {this.props.children}
                <Infobox/>
            </div>
        )
    }
}

export default App;

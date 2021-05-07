import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../styles/buttons.css';

export default class UsersView extends Component {
    render() {
        let userRows = this.props.users.map(user =>
            <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.roles}</td>
                <td>{user.isDeleted}</td>
                {this.getActions(user, this.props.userId)}
            </tr>
        );

        return (
            <div className="container">
                <div className="table-responsive">
                    <h1>Users</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th >Username</th>
                            <th>FullName</th>
                            <th>Roles</th>
                            <th>ExistingAccount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getActions(user, userId) {
        let editUserLink = <Link to={"/editUser/" + user._id} className="btn btn-lg btn-primary btn-block" style={{width:'110px',
                    height:'35px', paddingTop:'5px'}}>Edit user</Link>
        let detailsUserLink = <Link to={"/detailsUser/" + user._id} className="btn btn-lg btn-primary btn-block" style={{width:'110px',
                    height:'35px', paddingTop:'5px'}}>Details</Link>
        let deleteUserLink = <Link to={"/deleteUser/" + user._id} className="btn btn-lg btn-danger btn-block" style={{width:'110px',
                    height:'35px', paddingTop:'5px'}}>Delete</Link>
        if(sessionStorage.getItem('role') === 'admin'
        || (sessionStorage.getItem('role') === 'moderator'
            && user.roles !== 'admin' && user.roles !== 'moderator')) {
            return (
                <td style={{textAlign:'center'}}>
                    <div className="form-group">
                        {editUserLink}
                        {detailsUserLink}
                        {deleteUserLink}
                    </div>
                </td>
            );
        } else {
            return (
                <td style={{textAlign:'center'}}>
                    <div className="form-group">
                        {detailsUserLink}
                    </div>
                </td>
            );
        }
    }
}
                    

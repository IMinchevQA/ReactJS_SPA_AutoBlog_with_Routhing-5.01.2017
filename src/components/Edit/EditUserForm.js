/**
 * Created by Mihail on 12/3/2016.
 */
import React, {Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class EditDeleteUserForm extends Component {
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-2">

                        <form className="form-signin" onSubmit={this.props.onSubmitHandler}>
                            <div className="form-group">
                                <h1>Edit User</h1>
                                    <label>Username:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        required
                                        value={this.props.username}
                                        onChange={this.props.onChangeHandler}
                                    />
                                    <br/>
                                    <label>Full name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Fullname"
                                        name="fullname"
                                        required
                                        value={this.props.fullname}
                                        onChange={this.props.onChangeHandler}
                                    />
                                    <br/>
                                    <label>Password:</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        required
                                        onChange={this.props.onChangeHandler}
                                    />
                                    <br/>
                                    <label>Roles: <i><b>user</b>/<b>admin</b>/<b>moderator</b></i></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Roles"
                                        name="roles"
                                        required
                                        value={this.props.roles}
                                        onChange={this.props.onChangeHandler}
                                    />
                                    <br/>
                                    <label>Deleted user: <i><b>true</b>/<b>false</b></i></label>
                                    <select
                                        className="form-control"
                                        placeholder="IsDeleted"
                                        name="isDeleted"
                                        onChange={this.props.onChangeHandler}
                                        >
                                        <option value=''></option>
                                        <option value='true'>true</option>
                                        <option value='false'>false</option>
                                    </select>


                                    <br/>
                                    <span>
                                        <input
                                            className={this.props.className}
                                            type="submit"
                                            value={this.props.submitButtonName}
                                            disabled={this.props.submitDisabled}
                                            style={{width:'150px', height:'35px', paddingTop:'7px'}}
                                        />
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>
                                        <input
                                            className="btn btn-primary"
                                            type="button"
                                            style={{width:'90px', height:'35px', paddingTop:'7px'}}
                                            value="Cancel"

                                             onClick={this.props.cancelButton}/>
                                    </span>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

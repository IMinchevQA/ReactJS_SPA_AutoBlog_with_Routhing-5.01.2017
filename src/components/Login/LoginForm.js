import React, {Component} from 'react';

import '../../styles/Forms-Style.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class LoginForm extends Component {
    render() {
        return (
                <div className="col-sm-6 col-md-4 col-md-offset-2">
                    <div className="account-wall">
                        <img className="profile-img"
                             src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                             alt=""/>
                        <form onSubmit={this.props.onSubmitHandler}>
                            <div className="form-group">
                                <label>Username:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={this.props.username}
                                    disabled={this.props.submitDisabled}
                                    onChange={this.props.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.props.password}
                                    disabled={this.props.submitDisabled}
                                    onChange={this.props.onChangeHandler}
                                />
                            </div>
                            <input className="btn btn-primary" type="submit" value="Login" disabled={this.props.submitDisabled}/>
                        </form>
                    </div>
                </div>
        );
    }
}
import React, {Component} from 'react';

export default class RegisterForm extends Component {
    render() {
        return (
            <div className="col-sm-12 col-md-6 col-md-offset-2">
                <div className="account-wall">
                    <form className="register-form" onSubmit={this.props.onSubmitHandler}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                required
                                value={this.props.username}
                                disabled={this.props.submitDisabled}
                                onChange={this.props.onChangeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Fullname:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="fullname"
                                required
                                value={this.props.fullname}
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
                                required
                                value={this.props.password}
                                disabled={this.props.submitDisabled}
                                onChange={this.props.onChangeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Repeat Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                name="repeat"
                                required
                                value={this.props.repeat}
                                disabled={this.props.submitDisabled}
                                onChange={this.props.onChangeHandler}
                            />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Register" disabled={this.props.submitDisabled}/>
                    </form>
                </div>
            </div>
        );
    }
}
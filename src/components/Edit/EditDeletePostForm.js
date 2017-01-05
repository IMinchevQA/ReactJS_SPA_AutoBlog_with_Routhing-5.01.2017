import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


export default class EditDeletePostForm extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-2">
                        <div className="account-wall">
                            <img className="profile-img"
                                 src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                 alt=""/>
                            <form className="form-signin" onSubmit={this.props.onSubmitHandler}>
                                <label>Title:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    required
                                    value={this.props.title}
                                    disabled={this.props.fieldsDisabled[0]}
                                    onChange={this.props.onChangeHandler}
                                />
                                <br/>
                                <label>Author:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Author"
                                    value={this.props.author}
                                    disabled={this.props.fieldsDisabled[1]}
                                    onChange={this.props.onChangeHandler}
                                />
                                <br/>
                                <label>Image Url</label>
                                <input
                                    className="form-control"
                                    type="url"
                                    placeholder="ImageUrl"
                                    name="imageUrl"
                                    required
                                    value={this.props.imageUrl}
                                    disabled={this.props.fieldsDisabled[2]}
                                    onChange={this.props.onChangeHandler}
                                />

                                <br/>
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="20"
                                    required
                                    value={this.props.description}
                                    disabled={this.props.fieldsDisabled[3]}
                                    onChange={this.props.onChangeHandler}
                                    autoFocus="autoFocus"
                                />



                                    <span>
                                        <input
                                            className={this.props.className}
                                            style={{ marginLeft:'5px'}}
                                            type="submit"
                                            value={this.props.submitButtonName}
                                            disabled={this.props.submitDisabled}/>
                                    </span>                                &nbsp;
                                <span><input type="button" style={{marginTop:'10px', width:'120px', height:'45px'}}
                                             value="Cancel" className="btn btn-primary"
                                             onClick={this.props.cancelButton}/></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>);

    }
}

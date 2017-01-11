import React, {Component} from 'react';
import '../../styles/Forms-Style.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class UserDetails_DeleteView extends Component {
    render() {
        return (
            <div className="container">
                <input
                    className="btn btn-lg btn-primary"
                    type="button"
                    value="Back"
                    style={{marginBottom:'10px', display:`${this.props.displayBackBtn}`}}
                    onClick={this.props.backBtnClick}/>
                <div className="details-view">
                    <form onSubmit={this.props.onSubmitHandler}>
                        <fieldset style={{
                            display: 'block',
                            marginLeft: '2px',
                            marginRight: '2px',
                            paddingTop: '0.35em',
                            paddingBottom: '0.625em',
                            paddingLeft: '0.75em',
                            paddingRight: '0.75em',
                            border: '2px groove (internal value)'
                        }}>
                            <legend>User details:</legend>
                                <p><b>UserName:</b><span style={{marginLeft:'21px'}}>{this.props.username}</span></p>
                                <p><b>FullName:</b><span style={{marginLeft:'26px'}}>{this.props.fullname}</span></p>
                                <p><b>Roles:</b><span style={{marginLeft:'52px'}}>{this.props.roles}</span></p>
                                <p><b>Deleted user:</b><span style={{marginLeft:'5px'}}>{this.props.isDeleted}</span></p>
                            <br/>
                            <span>
                                <input
                                    className={'btn btn-danger'}
                                    style={{ width:'120px', height:'40px', display:`${this.props.displayDelBtn}`}}
                                    type="submit"
                                    value={'Delete'}
                                    disabled={this.props.submitDisabled}
                                />
                            </span>
                            <span>
                                <input
                                    className="btn btn-success"
                                    style={{marginLeft:'10px', width:'80px', height:'40px', display:`${this.props.displayCancelBtn}`}}
                                    type="button"
                                    value="Cancel"
                                    onClick={this.props.cancelBtnClick}
                                />
                            </span>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; //Link,
import PropTypes from 'prop-types';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
//Simport Upload from 'material-ui-upload/Upload';
import Typography from 'material-ui/Typography';



class Welcome extends Component {
    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });
                    console.log(this.state.images);
                }
            });
    };
    constructor() {
        super();
        this.state = {
            images: [],

        };
    }

    componentDidMount() {
        API.getImages()
            .then((data) => {

                this.setState({
                    images: data
                });
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-2" >

                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-8" >
                        <Typography
                            align={'center'}
                            type="display3"
                            className="txt txt-primary"
                        >DropBox
                        </Typography>
                        <ImageGridList images={this.state.images}/>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-2">
                         <button className="btn btn-danger">Logout</button>
                        <TextField
                            className={'fileupload'}
                            type="file"
                            name="mypic"
                            onChange={this.handleFileUpload}
                        />
                    </div>
                </div>
            </div>

        );
    }




}

export default withRouter(Welcome);
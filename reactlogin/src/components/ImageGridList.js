import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import axios from 'axios';
import * as API from '../api/API';
import Message from './Message'
import {GridList, GridListTile} from 'material-ui/GridList';

//import IconButton from 'material-ui/IconButton';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    gridList: {

        width: 500,
        height: 450,
        overflowY: 'auto',
    },


    subheader: {
        width: '100%',
    },
});

class ImageGridList extends Component {

    constructor(props){
        super(props);
        this.state={
            imagedata:[],
            shareUsername:'',
            message:"",
        };
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };

    componentWillReceiveProps(newProps){
        this.setState({imagedata:newProps.images});
    }
    //
    //
    // componentDidMount(){
    //     API.getImages()
    //         .then((data) => {
    //
    //             this.setState({
    //                 imagedata: data
    //             });
    //         });
    // }

    deleteFilePath=(filename)=>{
        axios.post('http://localhost:3001/users/deleteFilePath',{
            file: filename,
        }).then((response)=>{
            console.log("In deleteFilePath post ");
            API.getImages()
                .then((data) => {
                    this.setState({
                        imagedata: data,
                        message:""
                    });
                });
        }).catch((error)=>{this.setState({

            message:"you cannot delete this file as it is shared to you by other user"
        });
        });
    };
    shareFile=(username,file)=>{
        console.log(file);
        axios.post('http://localhost:3001/users/shareFile',{
            user: username,
            file: file
        }).then((status) => {
            if (status === 401) {
                this.setState({

                    message: "User doesnot exists..!!",

                });
            }
        });};

            render()
            {
                const classes = this.props;
                return (
                    <div className={classes.root}>
                        <ul className="list-group">
                            {this.state.imagedata.map(tile => (
                                <li className="list-group-item">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <a href={'http://localhost:3001/uploads/' + tile.img} download>{tile.img}</a>
                                    </div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                    </div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                                data-target="#myModal">Share
                                        </button>
                                    </div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <button className="btn btn-danger btn-sm" type="button"
                                                onClick={() => this.deleteFilePath(tile.img)}>Remove
                                        </button>

                                    </div>
                                    <div className="modal fade" id="myModal" role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        label="shareUsername"
                                                        placeholder="Enter Username to share"
                                                        onChange={(event) => {
                                                            this.setState({shareUsername: event.target.value});
                                                        }}/>
                                                    <Message message={this.state.message}/>
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-info" data-dismiss="modal"
                                                            onClick={() => this.shareFile(this.state.shareUsername, tile.img)}>
                                                        Share
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </li>


                            ))}
                        </ul>
                        <div><Message message={this.state.message}/></div>
                    </div>
                )
            }

}
export default withStyles(styles)(ImageGridList);
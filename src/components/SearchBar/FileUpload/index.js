import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Loading from '../../Loading/Loading';
import {add} from '../../../lib/ipfsService';
import './FileUpload.css';

export default class extends Component {
  
  state = {
    ipfsHash: "",
    fileName: "",
    loading: false,
    uploadSuccess: false
  }

  handleNewUpload = () => {
    this.setState({uploadSuccess: false})
  }

  onDrop = (acceptedFiles) => {
    let self = this;
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = async () => {
        this.setState({loading: true});
        const fileAsArrayBuffer = reader.result;
        const buffer = new Buffer(fileAsArrayBuffer);
        //console.log('fileAsArrayBuffer', fileAsArrayBuffer);
        const files = [
          {
            path: file.name,
            content: buffer
          }
        ]
        //console.log(files);
        // TODO display uploading
        const hash = await add(files);
        // TODO display result hash
        this.setState({fileName: file.name, ipfsHash: hash[0].hash, uploadSuccess: true, loading: false});
        const link = <span className="link">IPFS File Link: <a href={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} target="_blank">{this.state.ipfsHash}</a></span>;
        self.props.handleWarningOpen(link);
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsArrayBuffer(file);
    });
  }

  render() {
    return (
      <div className="file_upload">
        <h3><span>UPLOAD FILE TO IPFS</span></h3>
        { this.state.loading && <Loading/> }
        { (!this.state.uploadSuccess && !this.state.loading) && 
          <div className="uploader">
          <Dropzone onDrop={(files) => this.onDrop(files)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
          </div>
        }
        { this.state.uploadSuccess && 
          <div className="type_list">
            <div className="type_box">
              <label>Upload IPFS Hash</label>
              <p className="status_check">
                <a href={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} target="_blank">{this.state.ipfsHash}</a>
              </p>
            </div>
            <button onClick={() => this.handleNewUpload()}>Upload New File</button>
          </div>
        }
      </div>
    )
  }
}





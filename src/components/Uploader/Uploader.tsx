import React , {Fragment, createRef, RefObject} from 'react';
import {Input , Button, Progress} from 'semantic-ui-react'
import 'toasted-notes/src/styles.css';
import {alert as toast} from '../../utils/Alert'

import * as Api from '../../utils/Api'
import {UPLOAD_URL} from '../../constants'
import './Uploader.css'

interface Props {}
interface State {
  fileValue: string;
  file: any;
  percent: any;
  success: boolean;
  error:boolean;
  isUploading: boolean;
}

class UploaderComponent extends React.Component<Props,State> {

  private chooseFile:RefObject<HTMLInputElement>
  private fileTextField:RefObject<Input>

  constructor(props:Props){
    super(props)
    this.chooseFile = createRef<HTMLInputElement>()
    this.fileTextField = createRef<Input>()
  }

  state: State = {
    fileValue: "",
    file: null,
    percent:0,
    success:false,
    error:false,
    isUploading: false
  }

  onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files)
    
    const file = e.target.files ? e.target.files[0] : null

    if(file){
      // console.log("name: ",file.name)
      // console.log("file: ",file)
      this.setState({
        fileValue:file.name,
        file:file,
        isUploading:false
      })
    }
  }

  openWindow = () => {
    if(this.chooseFile.current){
      this.chooseFile.current.click()
    }
  }

  validateFile = (file: any)=> {
    // console.log(file)
    return new Promise<string>((resolve,reject)=> {
      if(!file){
        reject("please choose file")
      }
  
      const zipType = "application/zip"
  
      // file size that larger than 30MB is not permitted.
      if(file.size > 30000000){
        reject("file size is larger than 30MB , Please choose a correct file")
      }
      
      // Check the type of file that is a zip file type ?
      if(file.type !== zipType){
        reject("file type is not correct type")
      }
      resolve("OK")
    })
  }

  upload = async () => {
    try{
      const message = await this.validateFile(this.state.file)
    }catch(err){
      console.log(err)
      return ;
    }
    this.setState({isUploading:true})
    const form = new FormData()
    form.append("file",this.state.file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: (ProgressEvent:any) => {
        // console.log("Progress: ", ProgressEvent.loaded)
        // console.log(ProgressEvent.total)
        this.setState({percent:(ProgressEvent.loaded / ProgressEvent.total*100)})
      }
    }
    Api.post(UPLOAD_URL,form,config)
      .then((result:any)=>{
        // console.log("results: ",result)
        toast("Uploaded Successfully")
        this.setState({success:true})
        setTimeout(()=>this.reset(),5000)
      })
      .catch((err:any)=>{
        console.log("Error:",err)
        this.setState({error:true})
        toast("Upload Error")
        setTimeout(()=>this.reset(),2000)
      })
  }

  reset = () => {
    if(this.chooseFile.current){
      this.chooseFile.current.value = ""
    }
    this.setState({
      fileValue:"",
      file:null,
      isUploading:false,
      success:false,
      error:false,
      percent:0
    })
  }


  render(){
    const {isUploading,percent} = this.state
    // console.log("filename render",this.state.fileValue)
    return (
      <Fragment>
          <h2 className="ui header">
              <i aria-hidden="true" className="upload icon"></i>
              <div className="content">Upload your zip File</div>
          </h2>
          <div className="ui right label input uploader" style={{marginTop:"1.25em"}}>
            <input onChange={this.onChooseFile} ref={this.chooseFile} type="file" name="file" id="zipfile" className="inputfile" />
            <Input ref={this.fileTextField} value={this.state.fileValue} type="text"/>
            <Button content="Choose a file" inverted color='blue' onClick={this.openWindow} />
            <div style={{marginTop:"0.75em"}}>
              <Button onClick={this.upload} content="Upload" primary/>
              <Button onClick={this.reset} content="Clear" secondary/>
            </div>
            { isUploading  && <Progress
              style={{marginTop:"1em"}}
              percent={Math.round(percent)}
              indicating
              progress
              success={this.state.success}
              error={this.state.error}
            />  }
          </div> 
      </Fragment>
    )
  }
}

export default UploaderComponent



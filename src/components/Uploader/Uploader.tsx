import React , {Fragment, createRef, RefObject} from 'react';
import {Input , Button} from 'semantic-ui-react'

import './Uploader.css'

interface Props {}
interface State {
  fileValue: string;
  file: {};
}

class UploaderComponent extends React.Component<Props,State> {

  private chooseFile:RefObject<HTMLInputElement> = createRef<HTMLInputElement>()
  private fileTextField:RefObject<Input> = createRef<Input>()

  constructor(props:Props){
    super(props)
    console.log("constructor")
  }

  state: State = {
    fileValue: "",
    file: {}
    
  }

  onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    
    const file = e.target.files ? e.target.files[0] : null

    if(file){
      const form = new FormData()
      form.append("1",file)
      console.log("name: ",file.name)
      console.log("file: ",file)
      this.setState({fileValue:file.name,file},()=>{
        console.log("new state",this.state)
        const xx = Object.assign({},this.state.file)
        console.log(Object.keys(xx))
      })
    }
  }

  openWindow = () => {
    if(this.chooseFile.current){
      this.chooseFile.current.click()
    }
  }

  validateFile = (file: any)=> {
    return new Promise<string>((resolve,reject)=> {
      if(Object.keys(file).length === 0){
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
    const message = await this.validateFile(this.state.file).catch((err)=>{console.log(err)})
    if(message){
      console.log(message)
    }

    // const form = new FormData()
    // form.append(this.state.file)
    // fetch("http://xxx",{
    //   method: "POST",
    //   body: form
    // })
  }

  reset = () => {
    this.setState({fileValue:""})
  }


  render(){
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
          </div>
      </Fragment>
    )
  }
}

export default UploaderComponent



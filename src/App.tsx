import React from 'react';
import UploaderComponent from './components/uploader/Uploader'
import './App.css';



interface Props {}
interface State {}

class App extends React.Component<Props,State> {
  

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <UploaderComponent/>
        </header>
      </div>
    )
  }
}

export default App;

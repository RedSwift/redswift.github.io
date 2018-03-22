import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import './App.css';
import breakFilesIntoSets from './Common/utils';
import OneRow from './Grouping/OneRow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(files) {
    const imagesPerPage = 6
    const chunkedArray = breakFilesIntoSets(files, imagesPerPage);
    const pages = chunkedArray.map((setOfImages, index) => {
      return this.renderRows(setOfImages, index);
    });

    this.setState({pages: pages})
  }

  renderRows(setOfImages, index) {
    let rows = [];
    rows.push(<OneRow key={1} firstImage={setOfImages[0]} secondImage={setOfImages[1]} />)

    if (setOfImages.length > 2) 
      rows.push(<OneRow key={2} firstImage={setOfImages[2]} secondImage={setOfImages[3]} />)

    if (setOfImages.length > 4) 
      rows.push(<OneRow key={3} firstImage={setOfImages[4]} secondImage={setOfImages[5]} />)

    return (
      <div className="one-page" key={index}>
        {rows}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div id="options-bar">
          <ReactFileReader base64={true} multipleFiles={true} handleFiles={this.handleChange}>
            <button className='btn'>Upload</button>
          </ReactFileReader>
        </div>
        {this.state.pages}
      </div>
    );
  }
}

export default App;

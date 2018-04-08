import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import './App.css';
import breakFilesIntoSets from './Common/utils';
import OneRow from './Grouping/OneRow';
import readExcel from './Excel/readExcel'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      excel: [],
      errorMessage: null
    }

    this.handlePhotoFiles = this.handlePhotoFiles.bind(this);
    this.handleExcelFile = this.handleExcelFile.bind(this);
    this.renderExcelTable = this.renderExcelTable.bind(this);
  }

  mapImageWithName(files) {
    // map base64 image with name
    const filesWithName = files['fileList']
    const base64 = files.base64
    return base64.map((src, index) => {
      return {src, name: filesWithName[index].name.replace(/\.[^/.]+$/, "")}
    })
  }
  
  handlePhotoFiles(files) {
    const jsonSheet = this.state.excel;
    if (jsonSheet.length < 1) {
      this.setState({errorMessage: 'Select an excel sheet'});
      return;
    }

    const imageWithNames = this.mapImageWithName(files)

    // #TODO - what if photos more than excel?
    const matchExcelWithPhotos = jsonSheet.map(person => {
      let match = imageWithNames.find(image => {
        console.log('checking', image.name, person['Photo_No'])
        return image.name === person['Photo_No'];
      })

      if (match) person.src = match.src;

      return person;
    });

    // #TODO - Use the new person with image and information
    const imagesPerPage = 6
    const chunkedArray = breakFilesIntoSets(matchExcelWithPhotos, imagesPerPage);
    const pages = chunkedArray.map((setOfImages, index) => {
      return this.renderRows(setOfImages, index);
    });

    this.setState({pages: pages})
  }

  handleExcelFile(file) {
    const excelFile = file[0]
    readExcel(excelFile)
      .then(excel=> {
        this.setState({excel})
      })
      .catch(err => {
        this.setState({errorMessage: err});
      })
  }

  renderExcelTable() {
    const excel = this.state.excel;

    if (excel.length <= 0) return null;

    const rows = excel.map(person => {
      let photo = <td className='red'>No</td>;
      if (person.src) {
        photo = <td className='green'>Yes</td>
      }

      return (
        <tr key={person['No']}>
          <td>{person['Name']}</td>
          <td>{person['Age']}</td>
          <td>{person['Gender']}</td>
          <td>{person['Church']}</td>
          <td>{person['Comments']}</td>
          {photo}
        </tr>
      )
    });
    return (
      <div className='table-page'>
        <table id='display-excel' border='1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Church</th>
              <th>Comments</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {rows} 
          </tbody>
        </table>
      </div>
    )
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

  renderError() {
    if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
    return null;
  }

  render() {
    return (
      <div className="App">
        <div id="options-bar">
          {this.renderError()}
          <ReactFileReader fileTypes='.xlsx' handleFiles={this.handleExcelFile}>
            <button className="btn">Excel</button>
          </ReactFileReader>
          <br/>
          <ReactFileReader base64={true} multipleFiles={true} handleFiles={this.handlePhotoFiles}>
            <button className='btn'>Photos</button>
          </ReactFileReader>
        </div>
        {this.renderExcelTable()}
        {this.state.pages}
      </div>
    );
  }
}

export default App;

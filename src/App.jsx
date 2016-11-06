import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import _ from 'lodash'

class App extends Component {

  state = {
    dimensions: [0, 0],
  }

  componentDidMount() {
    const updateDimensions = () => {
      this.setState({
        dimensions: [this.container.clientWidth, this.container.clientHeight]
      })
    }

    window.addEventListener('resize', _.debounce(updateDimensions.bind(this), 400))
    updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
  }

  render() {
    return (
      <div className="App" ref={div => this.container = div}>
        <Map dimensions={this.state.dimensions} />
      </div>
    );
  }
}

export default App;

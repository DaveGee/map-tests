import React from 'react'
import MapGL from 'react-map-gl'
import Vehicles from './Vehicles'

export default class Map extends React.Component {

  static propTypes = {
    dimensions: React.PropTypes.array
  }

  state = {
    viewport: {
      width: this.props.dimensions[0],
      height: this.props.dimensions[1],
      latitude: 37.78,
      longitude: -122.45,
      zoom: 11,
      isDragging: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const [width, height] = nextProps.dimensions
    const viewport = this.state.viewport

    if (width !== viewport.width)
      viewport.width = width
    if (height !== this.state.viewport.height)
      viewport.height = height

    this.setState({ viewport })
  }

  render () {
    return <MapGL
          {...this.state.viewport}
          onChangeViewport={viewport => this.setState({ viewport: Object.assign(this.state.viewport, viewport) })}
          mapboxApiAccessToken="pk.eyJ1IjoiZGF2ZWVkIiwiYSI6ImNpdjFkbnl0ZTAwMDAyeWxwNzJpZ3VpOTYifQ.4wb1YI5SR30tDpZ1eqg9TA"
          mapStyle={'mapbox://styles/mapbox/basic-v9'}
      >
        <Vehicles viewport={this.state.viewport} />
      </MapGL>
        
  }
}
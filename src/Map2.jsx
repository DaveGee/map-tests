import React from 'react'
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, Marker } from "react-mapbox-gl";

const accessToken = 'pk.eyJ1IjoiZGF2ZWVkIiwiYSI6ImNpdjFkbnl0ZTAwMDAyeWxwNzJpZ3VpOTYifQ.4wb1YI5SR30tDpZ1eqg9TA'

const containerStyle = {
  height: "100vh",
  width: "100%"
}

export default class Map extends React.Component {

  static propTypes = {
    dimensions: React.PropTypes.array
  }

  state = {
    center: [6.627419322736671, 46.52279498051374],
  }

  _onClickMap(map, args) {
    console.log("Clicked on the map : ", args.point, args.lngLat)
  }

  render() {
    return <ReactMapboxGl
      style={'mapbox://styles/mapbox/streets-v8'}
      onClick={this._onClickMap}
      onZoom={this._onZoom}
      accessToken={accessToken}
      center={this.state.center}
      movingMethod="jumpTo"
      containerStyle={containerStyle}
      >
      <ScaleControl />
      <ZoomControl />
    </ReactMapboxGl>
  }
}
import React from 'react'
import MapGL, {SVGOverlay} from 'react-map-gl'

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
    },
    angle: 0
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

  componentDidMount() {
    const animateMarker = (timestamp) => {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        this.setState({ angle: timestamp / 10 })
        requestAnimationFrame(animateMarker)
    }

    animateMarker(0)
  }

  _drawBus(opt) {
    if (opt.isDragging) return
    const [x, y] = opt.project([this.state.viewport.longitude, this.state.viewport.latitude])
    const w = 20
    const a = this.state.angle
    return <g transform={`rotate(${a}, ${x}, ${y})`}>
        <rect 
          x={x-w/2} 
          y={y-w*0.3} 
          rx="2" 
          ry="2" 
          width={w} 
          height={w*0.6}
          stroke="black" 
          fill="white" 
          strokeWidth="2"/>
        <circle cx={x} cy={y} r="3" fill="orange" />
      </g>

  }

  render () {
    return <MapGL
          {...this.state.viewport}
          onChangeViewport={viewport => this.setState({ viewport: Object.assign(this.state.viewport, viewport) })}
          mapboxApiAccessToken="pk.eyJ1IjoiZGF2ZWVkIiwiYSI6ImNpdjFkbnl0ZTAwMDAyeWxwNzJpZ3VpOTYifQ.4wb1YI5SR30tDpZ1eqg9TA"
          mapStyle={'mapbox://styles/mapbox/basic-v9'}
      >
        <SVGOverlay
          {...this.state.viewport}
          redraw={this._drawBus.bind(this)}
        />
      </MapGL>
        
  }
}
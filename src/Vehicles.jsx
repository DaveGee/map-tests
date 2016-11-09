import React from 'react'
import {SVGOverlay} from 'react-map-gl'

const nextPosition = ([lng, lat], bearing, distanceKm) => {
  var R = 6371; // Earth Radius in Km

  var lat2 = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distanceKm / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distanceKm / R) * Math.cos(Math.PI / 180 * bearing));
  var lon2 = Math.PI / 180 * lng + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distanceKm / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distanceKm / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(lat2));

  return [180 / Math.PI * lon2, 180 / Math.PI * lat2]
}

const r = () => Math.random() - 0.5
const randomBearing = () => Math.random() * 360
const randomRadius = () => Math.random() * 6
const randomPos = (lngLat) => nextPosition(lngLat, randomBearing(), randomRadius())

const ACCELERATION = 4 // km/s2 ... 0->100kmh in 20s => 0->30 in 7s => 0->4 in 1s
const MAX_SPEED = 30 // km/h 
const MAX_TURN_SPEED = 30 // °/s
const randomMovement = ({bearing, speed}, timeframe) => ({
  bearing: bearing + timeframe * r() * MAX_TURN_SPEED,       // max angle turned in 1s
  speed: Math.max(0, speed + r() * timeframe * ACCELERATION) % MAX_SPEED // max acceleration in 1s, max speed in km/h
})

export default class Vehicles extends React.Component {

  state = {
    position: randomPos([-122.447177, 37.755705]), 
    lastMove: {
      bearing: randomBearing(), // 0 = NORTH, clockwise
      speed: 0, // km/h
    }
  }

  componentDidMount() {
    let lastFrame = 0

    const move = (timestamp) => {
      const elapsed = (timestamp - lastFrame)
      const hoursPassed = elapsed / (10 * 3600)

      const newMove = randomMovement(this.state.lastMove, elapsed / 10)

      this.setState({
        position: nextPosition(this.state.position, newMove.bearing, newMove.speed * hoursPassed),
        lastMove: newMove
      })

      lastFrame = timestamp
      requestAnimationFrame(move)
    }

    requestAnimationFrame(move)
  }

  _drawBus(opt) {
    if (opt.isDragging) return
    const [x, y] = opt.project(this.state.position)
    const w = 20
    const a = this.state.lastMove.bearing
    return <g>
        <g transform={`rotate(${a}, ${x}, ${y})`}>
          <rect 
            x={x-w*0.3} 
            y={y-w/2} 
            rx="2" 
            ry="2" 
            width={w*0.6} 
            height={w}
            stroke="black" 
            fill="white" 
            strokeWidth="2"/>
          <polyline points={`${x} ${y+5} ${x} ${y-5} ${x-3} ${y-1} ${x} ${y-5} ${x+3} ${y-1}`} 
            fill="transparent" stroke="black" strokeWidth="1" />
        </g>
      </g>

  }

  render() {
    return <SVGOverlay
        {...this.props.viewport}
        redraw={this._drawBus.bind(this)}
      />
  }
}
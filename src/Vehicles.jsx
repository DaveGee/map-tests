import React from 'react'
import {SVGOverlay} from 'react-map-gl'

import {drawBus, bus} from './bus'
import {route} from './routes'

const randomRoute = route(10)
const buses = [bus([-122.447177, 37.755705])]
const routes = [randomRoute(buses[0])]

export default class Vehicles extends React.Component {

  state = {
    /*position: randomPos(), 
    bearing: randomBearing(),
    speed: MAX_SPEED,
    move: {
      a: 1,
      t: 0,
    }*/
    buses: routes.map(r => r[0]),
    time: 0,
  }

  componentDidMount() {
    setInterval(() => {
      const time = this.state.time + 1
      this.setState({
        buses: routes.map(r => r[time]),
        time
      })
    }, 5000)
    /*let lastFrame = 0

    const move = (timestamp) => {
      const elapsed = (timestamp - lastFrame)
      const secondsPassed = elapsed / 1000

      const newMove = nextMove(this.state.move)
      const newBearing = this.state.bearing + (newMove.t * TURN_ACC * secondsPassed)
      const newSpeed = Math.min(this.state.speed + (newMove.a * ACCELERATION * secondsPassed), MAX_SPEED)
      
      this.setState({
        bearing: newBearing,
        speed: newSpeed,
        position: nextPosition(
          this.state.position, 
          newBearing, 
          newSpeed * secondsPassed / 1000),
        move: newMove
      })

      lastFrame = timestamp
      requestAnimationFrame(move)
    }

    requestAnimationFrame(move)*/
  }

  _drawBus(opt) {
    if (opt.isDragging) return
    return drawBus(opt, this.state.buses[0])
  }

  render() {
    return <SVGOverlay
        {...this.props.viewport}
        redraw={this._drawBus.bind(this)}
      />
  }
}
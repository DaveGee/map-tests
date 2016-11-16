import React from 'react'
import { SVGOverlay } from 'react-map-gl'

import { drawBus, bus } from './bus'
import { route, TICK_INTERVAL } from './routes'

const newBus = () => bus([-122.447177, 37.755705])
const randomRoute = () => route(10)(newBus())
// routes are generated with pos every 5s
const routes = Array.from(Array(30), () => randomRoute())

const interpolate = (s, e, pc) => s + pc * (e-s)

export default class Vehicles extends React.Component {

  state = {
    buses: routes.map(r => r[0]),
    time: 0,
  }

  componentDidMount() {

    const startTime = 0
    const timeFactor = 1
    const reposition = elapsed => {
      const tick = (elapsed - startTime) / (1000 * TICK_INTERVAL / timeFactor)
      const pc = tick - Math.floor(tick)

      this.setState({
        buses: this.state.buses.map((b, i) => {
          const prevPos = routes[i][Math.floor(tick)]
          const nextPos = routes[i][Math.ceil(tick)]
          return {
            position: prevPos.position.map((p, i) => interpolate(p, nextPos.position[i], pc)),
            bearing: interpolate(prevPos.bearing, nextPos.bearing, pc),
            speed: prevPos.speed,
          }
        })
      })

      requestAnimationFrame(reposition)
    }

    requestAnimationFrame(reposition)
  }

  _drawBus(opt) {
    return this.state.buses.map((b, i) => drawBus(i, opt, b))
  }

  render() {
    return <SVGOverlay
      {...this.props.viewport}
      redraw={this._drawBus.bind(this)}
      />
  }
}
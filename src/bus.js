import React from 'react'
import {randomPos, randomBearing, MAX_SPEED} from './routes'

export const drawBus = (opt, {position, bearing}) => {
  const [x, y] = opt.project(position)
  const w = 20
  const a = bearing
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

export const bus = lngLat => ({
  position: randomPos(lngLat),
  bearing: randomBearing(),
  speed: MAX_SPEED,
}) 
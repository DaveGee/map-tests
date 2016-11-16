
const ACCELERATION = 4/3.6          // m/s2   /// 0->100kmh in 20s => 0->30 in 7s => 0->4 km/h in 1s => 4/3,6 m/s2
const TURN_ACC = 20                 // °/s2   /// 
export const MAX_SPEED = 60/3.6     // m/s    /// 30km/h => 30000/3600 m/s
export const TICK_INTERVAL = 5      // s

const r = () => Math.random() - 0.5
export const randomBearing = () => Math.random() * 360
const randomRadius = () => Math.random() * 6

export const nextPosition = ([lng, lat], bearing, distanceKm) => {
  var R = 6371; // Earth Radius in Km

  var lat2 = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distanceKm / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distanceKm / R) * Math.cos(Math.PI / 180 * bearing));
  var lon2 = Math.PI / 180 * lng + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distanceKm / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distanceKm / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(lat2));

  return [180 / Math.PI * lon2, 180 / Math.PI * lat2]
}

export const randomPos = (lngLat) => nextPosition(lngLat, randomBearing(), randomRadius())

export const route = lengthKm => bus => {
  const route = [bus]
  let lastWp = bus.position
  let lastBearing = bus.bearing
  for(let i = 1; i < lengthKm * 1000 / TICK_INTERVAL; i++) { 
    lastBearing = (i*TICK_INTERVAL/100) % 1 === 0 ? randomBearing() : lastBearing
    lastWp = nextPosition(lastWp, lastBearing, MAX_SPEED * TICK_INTERVAL / 1000)
    route.push({ 
      position: lastWp,
      bearing: lastBearing,
      speed: MAX_SPEED
    })
  }
  return route
}









/*const nextMove = move => {

  if (Math.random() > 0.2)
    move.a = 1
  else 
    move.a = Math.sign(r())

  if (Math.random() > 0.9)
    move.t = Math.sign(r())
  return move
}*/
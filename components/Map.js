import { useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { UberContext } from '../context/uberContext'
import * as turf from '@turf/turf'

const style = {
  wrapper: `flex-1 h-full w-full absolute bottom-0`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/coderweb3/clgqlo13q00jk01qy2cgb77z8',
      center: [-.2, 39.39],
      zoom: 4,
    })

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates)
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates)
    }

    if (pickupCoordinates && dropoffCoordinates) {
      const distance = turf.distance(
        turf.point(pickupCoordinates),
        turf.point(dropoffCoordinates)
      )

      console.log('Distance:', distance)
      
      map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: 400,
      })
    }
  }, [pickupCoordinates, dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  return <div className={style.wrapper} id='map' />
}

export default Map

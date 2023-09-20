import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const languageCode = 'fr';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPointsOfInterest = async () => {
          const locations = await directus.request(
              readItems('villages', {
                deep: {
                  translations: {
                    _filter: {
                      languages_code: { _eq: languageCode },
                    },
                  },
                },
                filter: {
                  status: { _eq: 'approved' },
                  // googlemaplink: { _eq: 'link' },
                },
                fields: ['id', 'geolocation'],
              })
          )
          return locations
        }

        getPointsOfInterest().then((locations) => {
          setLocations(locations)
          setLoading(false); 
        }).catch((error) => {
          window.notifyRed('An error occurred while fetching the villages.')
        }); 
    }, []);

    useEffect(() => {
      if (!loading) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/taha001/clmesblp601fb01r752kh82hq',
          center: [-7.5898, 31.7917], 
          zoom: 5
        });
  
        // Set the cursor to 'grab' by default
        map.getCanvas().style.cursor = 'grab';
  
        // Change the cursor to 'grabbing' during a drag
        map.on('dragstart', () => {
            map.getCanvas().style.cursor = 'grabbing';
        });
  
        // Change the cursor back to 'grab' once the drag ends
        map.on('dragend', () => {
            map.getCanvas().style.cursor = 'grab';
        });
        // When the map is loaded...
        map.on('load', () => {
            // Add dots in specific locations
            const poi = locations.map(poi => { return poi.geolocation.coordinates })
            // Add a data source for the locations
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': poi.map(loc => ({
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': loc
                        }
                    }))
                }
            });
  
            // Add a layer to visualize the locations as green circles
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-radius': 10, // Circle size
                    'circle-color': '#006233' // Green color
                }
            });
        });
  
        map.on('click', 'points', (e) => {
          window.notify('event: ' + e.features)
        })
  
        return () => map.remove()
      }
    }, [loading]);

    return (<div>
              {loading ? (
                <p>Loading...</p>
                  ) : (
                <div>
                  <div className='mapdiv' ref={mapContainerRef} />;
                </div>
              )}
            </div>)
  
}

export default MapComponent;
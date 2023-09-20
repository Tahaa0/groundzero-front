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
                  // status: { _eq: 'approved' },
                  googlemaplink: { _eq: 'link' },
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
            map.addSource('villages', {
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
                },
                'cluster': true,
                'clusterMaxZoom': 14, // Max zoom to cluster points on
                'clusterRadius': 150 // Radius of each cluster when clustering points (defaults to 50)
            });
  
            // Add a layer to visualize the locations as green circles
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': 'villages',
                'filter': ['!', ['has', 'point_count']],
                'paint': {
                    'circle-radius': 5, // Circle size
                    'circle-color': '#006233', // Green color
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            map.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'villages',
              filter: ['has', 'point_count'],
              paint: {
                // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 10
                //   * Yellow, 30px circles when point count is between 10 and 25
                //   * Pink, 40px circles when point count is greater than or equal to 25
                'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#51bbd6',
                  10,
                  '#f1f075',
                  25,
                  '#f28cb1'
                ],
                'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  20,
                  10,
                  30,
                  25,
                  40
                ]
              }
            });
               
            map.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: 'villages',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
              }
            });
        });

        // inspect a cluster on click
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource('villages').getClusterExpansionZoom(clusterId,
            (err, zoom) => {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });

        map.on('click', 'points', (e) => {
          const coordinates = e.features[0].geometry.coordinates;
          
          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          // }

          window.notify(String(coordinates))
          
          // new mapboxgl.Popup()
          //   .setLngLat(coordinates)
          //   .setText(`long: ${coordinates[0]}lat: ${coordinates[1]}`)
          //   .addTo(map)

          map.flyTo({
            center: coordinates,
            zoom: 8,
            essential: true, // This ensures the animation is smooth and not interrupted
          });
        })

        map.on('mouseenter', 'points', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
           
        map.on('mouseleave', 'points', () => {
          map.getCanvas().style.cursor = 'grab';
        });

        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
           
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = 'grab';
        });
  
        return () => map.remove()
      }
    }, [loading]);

    return (<div>
              {loading ? (
                <p>Loading...</p>
                  ) : (
                <div>
                  <div className='mapdiv' ref={mapContainerRef} />
                </div>
              )}
            </div>)
  
}

export default MapComponent;
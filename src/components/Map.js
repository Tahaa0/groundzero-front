import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';
import PanelLeft from './PanelLeft';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const languageCode = 'fr';
const worldview = 'MA'

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const [villages, setVillages] = useState([]);
    const [missing, setMissing] = useState([]);
    const [panel, setPanel] = useState('');
    const [panelID, setPanelID] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVillages = async () => {
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
                  geolocation: { _nnull: true }
                  // googlemaplink: { _eq: 'link' },
                },
                fields: ['id', 'geolocation'],
              })
          )
          return locations
        }

        const getMissing = async () => {
          const locations = await directus.request(
              readItems('missing_persons', {
                deep: {
                  translations: {
                    _filter: {
                      languages_code: { _eq: languageCode },
                    },
                  },
                },
                filter: {
                  status: { _eq: 'published' },
                  location: { _nnull: true }
                  // googlemaplink: { _eq: 'link' },
                },
                fields: ['id', 'location', 'gender'],
              })
          )
          return locations
        }

        getVillages().then((village_locations) => {
          village_locations = village_locations.map((item) => {
            return {
              id: item.id,
              geolocation: item.geolocation,
              person: 'village'
            };
          });
          setVillages(village_locations)
          getMissing().then((missing_locations) => {
            missing_locations = missing_locations.map((item) => {
              return {
                id: item.id,
                geolocation: item.location,
                person: item.gender
              };
            });
            setMissing(missing_locations)
            setLoading(false); 
          }).catch((error) => {
            window.notifyRed('An error occurred while fetching missing persons.')
          }); 
        }).catch((error) => {
          window.notifyRed('An error occurred while fetching villages.')
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
            // Add a data source for the locations
            map.addSource('points_of_interest', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': villages.concat(missing).map( loc => ({
                        'type': 'Feature',
                        'id': loc.id,
                        'properties': {
                          'person' : loc.person
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': loc.geolocation.coordinates,
                        }
                    }))
                },
                'cluster': true,
                'clusterMaxZoom': 10, // Max zoom to cluster points on
                'clusterRadius': 150 // Radius of each cluster when clustering points (defaults to 50)
            });
  
            // Add a layer to visualize the locations as green circles
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': 'points_of_interest',
                'filter': ['!', ['has', 'point_count']],
                'paint': {
                    'circle-radius': 5, // Circle size
                    'circle-color': [
                      'match',
                      ['string', ['get', 'person']],
                      'male',
                      '#0047AB',
                      'female',
                      '#FF69B4',
                      'village',
                      '#006233',
                      /* other */ '#ccc'
                    ],
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            map.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'points_of_interest',
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
              source: 'points_of_interest',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
              }
            });

            const adminLayers = ['admin-0-boundary', 'admin-1-boundary', 'admin-0-boundary-disputed', 'admin-1-boundary-bg', 'admin-0-boundary-bg']
            adminLayers.forEach((adminLayer) => {
              map.setFilter(adminLayer, ["match", ["get", "worldview"], ["all", worldview], true, false])
            });
        });

        // inspect a cluster on click
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource('points_of_interest').getClusterExpansionZoom(clusterId,
            (err, zoom) => {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });

        map.on("click", "points", e => {
          const features = map.queryRenderedFeatures(e.point, {layers: ["points"],})
          setPanelID(features[0].id)
          setPanel(features[0].properties.person)
          
          map.flyTo({
            center: features[0].geometry.coordinates,
            zoom: 11,
            essential: true, // This ensures the animation is smooth and not interrupted
          });
        })

        // map.on("click", (e) => {
        //   setPanel(0)
        // })

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

    return (<>
              {panelID > 0 ? (<PanelLeft Id={panelID} type={panel} />) : (<p>No corresponding item</p>)}
              {loading ? (
                <p>Loading...</p>
                  ) : (
                <div>
                  <div className='mapdiv' ref={mapContainerRef} />
                </div>
              )}
            </>)
}

export default MapComponent;
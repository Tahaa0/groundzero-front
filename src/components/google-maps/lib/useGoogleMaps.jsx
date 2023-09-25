import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useState } from 'react';

import { GoogleMapMarker } from './GoogleMapMarker';
import { Map } from './Map';

const render = (status) => {
  return <h1>{status}</h1>;
};

export const useGoogleMaps = ({
  lat,
  lng,
  onCoordsChange,
  defaults,
  mapContainerStyles,
  showPropsCoords,
  googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  disabled = false,
  libraries,
}) => {
  const { zoom: defaultZoom = 5 } = defaults;
  // START: Maps - React Map Component App State
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e, disabled) => {
    if (!disabled) {
      if (e.latLng) {
        onCoordsChange?.(e.latLng.lat(), e.latLng.lng());
        // setMarker(() => e.latLng?.toJSON());
        // Center the map to the currently selected marker, upon change.
        setCenter(() =>
          e.latLng ? { ...e.latLng.toJSON() } : { lat: 0, lng: 0 }
        );
      }
    }
  };
  // END: Maps - React Map Component App State

  useEffect(() => {
    const paramsCoords = { lat, lng };

    const defaultHardCodedCoords = {
      lat,
      lng,
    };

    setCenter(showPropsCoords ? paramsCoords : defaultHardCodedCoords);

    setZoom(defaultZoom);
  }, [defaultZoom, lat, lng, showPropsCoords]);

  useEffect(() => {
    setCenter({
      lat,
      lng,
    });
  }, [lat, lng]);

  // Start: Maps - React Map Component App Return
  // Only create the Map component when directionssReady is true
  const googleMap = (
    <div className={`flex h-96 ${mapContainerStyles}`} style={{
      display: 'flex', height: '230px'
    }}>
      <Wrapper
        apiKey={googleApiKey}
        render={render}
        libraries={libraries}
      >
        <Map
          center={center}
          zoom={zoom}
          onClick={(e) => onClick(e, disabled)}
          className="grow h-full"
          style={{
            height: '100%',
            width: '100%',
            flexGrow: '1'
          }}
        >
          <GoogleMapMarker
            position={{
              lat,
              lng,
            }}
            visible={true}
          />
        </Map>
      </Wrapper>
      {/* Basic Form for controlling center and zoom of the map */}
    </div>
  );

  return {
    googleMapComponent: googleMap,
  };
  // End: Maps - React Map Component App Return
};

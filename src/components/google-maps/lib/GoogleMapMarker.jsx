/*global google*/
import { useEffect, useState } from "react";

// START: Maps - React Map Marker Component
export const GoogleMapMarker = googleMapsMarkerOptions => {
  const [googleMapMarker, setGoogleMapMarker] = useState();

  useEffect(() => {
    if (!googleMapMarker) {
      setGoogleMapMarker(() => new google.maps.Marker());
    }

    // Remove marker from the map on unmount
    return () => {
      if (googleMapMarker) {
        googleMapMarker.setMap(null);
      }
    };
  }, [googleMapMarker]);

  useEffect(() => {
    if (googleMapMarker) {
      googleMapMarker.setOptions(googleMapsMarkerOptions);
    }
  }, [googleMapMarker, googleMapsMarkerOptions]);

  return null;
};
// END: Maps - React Map Marker Component

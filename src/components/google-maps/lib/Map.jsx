/*global google*/
import React, { useEffect, useMemo, useRef, useState } from 'react';

export const Map = ({
  className,
  style,
  onClick,
  children,
  ...options
}) => {
  // START: Maps - React Map Component Add Map Hooks
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    // Will be triggered when the ref changes
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: options.center,
          zoom: options.zoom,
          scrollwheel: false,
        })
      );
    }
  }, [ref, map, options.zoom, options.center]);
  // END: Maps - React Map Component Add Map Hooks

  // START: Maps - React Map Component Event Hooks
  useEffect(() => {
    if (map) {
      // Clear exisitng listeners when the handler passed as a prop has been changed
      ['click', 'idle'].forEach((eventName) => {
        google.maps.event.clearListeners(map, eventName);
      });

      if (onClick) {
        map.addListener('click', onClick);
      }
    }
  }, [map, onClick]);
  // END: Maps - React Map Component Event Hooks

  // START: Maps - React Map Component Return
  return (
    <>
      <div className={className} style={style} ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Set the map prop on the child compnent
          return React.cloneElement(child, { ...child.props, map });
        }
      })}
    </>
  );
  // END: Maps - React Map Component Return
};

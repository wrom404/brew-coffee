import { CoordinatesType } from "@/types/types";
import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

// Define styles for the map container
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default location (Ormoc, PH)
const defaultCenter: CoordinatesType = {
  lat: 11.0069,
  lng: 124.6075,
};

const GoogleMapComponent: React.FC = () => {
  const [location, setLocation] = useState<CoordinatesType>(defaultCenter);
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      // Create the script element if not already loaded
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${API_KEY}&libraries=geometry,places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setScriptLoaded(true);
      };

      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [API_KEY]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          console.error("Geolocation error:", error.message);
        }
      );
    }
  }, []);

  if (!scriptLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;

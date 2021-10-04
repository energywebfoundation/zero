import { Map, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export interface GenericMapProps {
  coordinates: [number, number];
  handleLocationChange: (coordinates: [number, number]) => void;
}

export const GenericMap = ({
  handleLocationChange,
  coordinates,
}: GenericMapProps) => {
  return (
    <Map
      zoom={13}
      style={{ width: '100%', height: '300px' }}
      center={coordinates}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        ondragend={(event) => {
          const { lat, lng } = event.target._latlng;
          handleLocationChange([lat, lng]);
        }}
        interactive={true}
        autoPanSpeed={10}
        autoPanPadding={[10, 10]}
        autoPan={true}
        position={coordinates}
        draggable={true}
      />
    </Map>
  );
};

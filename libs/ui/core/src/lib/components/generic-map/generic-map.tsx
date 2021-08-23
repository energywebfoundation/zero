import styled from '@emotion/styled';
import { Map, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* eslint-disable-next-line */
export interface GenericMapProps {
  coordinates: [number, number];
  handleLocationChange: (coordinates: [number, number]) => void;
}

const StyledGenericMap = styled.div``;

export const GenericMap = ({ coordinates }: GenericMapProps) => {
  return (
    <StyledGenericMap>
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
            console.log(event);
          }}
          interactive={true}
          autoPanSpeed={10}
          autoPanPadding={[10, 10]}
          autoPan={true}
          position={coordinates}
          draggable={true}
        />
      </Map>
    </StyledGenericMap>
  );
};

export default GenericMap;

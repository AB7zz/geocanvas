import React from 'react'
import { useParams } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import L, { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BotNav from '../components/Map/BotNav';

const CustomMarker = ({position, zoom, setZoom}) => {
  const map = useMapEvents({
    zoomend() {
      setZoom(map.getZoom())
    }
  })
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="height: ${10*zoom}px; width: ${10*zoom}px; background-color: white; border-radius: 10px;"></div>`
  });

  return <Marker position={position} icon={customIcon} />;
};

const Map = () => {
  const { mapid } = useParams()
  const [zoom, setZoom] = React.useState(13)
  const position = [51.505, -0.09]
      
  return(
    <>
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker position={position} zoom={zoom} setZoom={setZoom} />
      </MapContainer>
      <BotNav />
    </>
  )
}

export default Map
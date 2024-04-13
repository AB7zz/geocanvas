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
import TopNav from '../components/Map/TopNav';
import { useStateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom'

const CustomMarker = ({ position, zoom, setZoom, images }) => {
  const map = useMapEvents({
    zoomend() {
      setZoom(map.getZoom())
    }
  })
  let customIcon
  if(images.length == 1){
    customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
      <div 
        style="
          height: ${10 * zoom}px; 
          width: ${10 * zoom}px; 
          border-radius: 10px;
          overflow: hidden;
        "
      >
        <img 
          src="${images[0]}" 
          alt="Image" 
          style="
            width: 100%; 
            height: 100%; 
            object-fit: cover;
          "
        />
      </div>`
    });
  }else{
    customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
      <div 
        style="
          position: absolute;
          top: 0px;
          z-index: 10;
          height: ${10 * zoom}px; 
          width: ${10 * zoom}px; 
          border-radius: 10px;
          overflow: hidden;
        "
      >
        <img 
          src="${images[0]}" 
          alt="Image" 
          style="
            width: 100%; 
            height: 100%; 
            object-fit: cover;
          "
        />
      </div>
      <div 
        style="
          position: absolute;
          top: -15px;
          left: 15px;
          height: ${10 * zoom}px; 
          width: ${10 * zoom}px; 
          border-radius: 10px;
          overflow: hidden;
        "
      >
        <img 
          src="${images[1]}" 
          alt="Image" 
          style="
            width: 100%; 
            height: 100%; 
            object-fit: cover;
          "
        />
      </div>
      `
    });
  }

  return <Marker position={position} icon={customIcon} />;
};

const Map = () => {
  const { fetchPersonalDetails, userDetails } = useStateContext()
  const navigate = useNavigate()
  React.useEffect(() => {
    if(localStorage.getItem('login') != 'true'){
      window.location.replace('/login')
    }
    const res = fetchPersonalDetails()
    
    if(!res){
      localStorage.removeItem('username')
      localStorage.removeItem('login')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      navigate('/login', { replace: true })
    }
  }, [])

  React.useEffect(() => {
    if(userDetails.length > 0 && !userDetails.username){
      navigate('/username', {replace: true})
    }else if(userDetails.username && !localStorage.getItem('username')){
      localStorage.setItem('username', userDetails.username)
    }
  }, [userDetails])

  const { username } = useParams()
  const { imageData, setImageData } = useStateContext()
  const [zoom, setZoom] = React.useState(13)
  const position = [51.505, -0.09]
      
  return(
    <>
      <TopNav />
      <MapContainer center={position} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          imageData && imageData.map((data, i) => 
            <CustomMarker key={i} position={data.position} zoom={zoom} setZoom={setZoom} images={data.images} />
          )
        }
      </MapContainer>
      <BotNav />
    </>
  )
}

export default Map
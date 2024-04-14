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

const CustomMarker = ({ lat, lng, zoom, setZoom, images }) => {
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

  return <Marker position={[lat, lng]} icon={customIcon} />;
};

const Map = () => {
  const { fetchPersonalDetails, profileDetails, fetchUserDetails, profileImages } = useStateContext()
  const navigate = useNavigate()
  const { username } = useParams()

  React.useEffect(() => {
    if(localStorage.getItem('login') != 'true'){
      window.location.replace('/login')
    }
    const fetchData = async() => {
      return await fetchPersonalDetails()
    }

    if(username == 'map'){
      const res = fetchData()
      
      if(!res){
        localStorage.removeItem('username')
        localStorage.removeItem('login')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login', { replace: true })
      }
    }else{
        fetchUserDetails(username)
    }
  }, [])

  React.useEffect(() => {
    if(profileDetails && profileDetails.length > 0 && !profileDetails.username){
      navigate('/username', {replace: true})
    }else if(profileDetails && profileDetails.username && !localStorage.getItem('username')){
      localStorage.setItem('username', profileDetails.username)
    }
  }, [profileDetails])

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
          profileDetails && profileDetails.username && profileImages && profileImages.map((data, i) => 
            <CustomMarker key={i} lat={data.lat} lng={data.lng} zoom={zoom} setZoom={setZoom} images={data.images} />
          )
        }
      </MapContainer>
      <BotNav />
    </>
  )
}

export default Map
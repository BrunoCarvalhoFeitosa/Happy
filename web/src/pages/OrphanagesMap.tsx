import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/iconMap';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return(
    <div id="page-map">
      <aside className="page-aside">
        <header>
          <Link to="/">
            <img src={mapMarkerImg} alt="Happy" />
          </Link>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Diadema</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
      
      <Map
        center={[-23.6869281, -46.6222821]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        >
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
          
          {orphanages.map(orphanage => {
            return (
              <Marker
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
                key={orphanage.id}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
      </Map>

      <div className="page-createOrphanage">
        <Link to="/orphanages/create">
          <FiPlus size={32} color="#fff" />
        </Link>
      </div>
    </div>
  ) ;
}

export default OrphanagesMap;
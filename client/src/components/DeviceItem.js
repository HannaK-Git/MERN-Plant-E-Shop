import React from 'react'
import {Card, Col, Image} from 'react-bootstrap'
import star from '../assets/star.svg'
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from '../utils/consts';
import styles from './styles.module.css';
import ThreeModel from './ThreeModel'; 


const DeviceItem = ({device}) => {
const history = useNavigate();

  // Check if the device image is a 3D model (GLB or GLTF)
const is3DModel = device.img?.toLowerCase().endsWith('.glb') || device.img?.toLowerCase().endsWith('.gltf');
  const src = `${process.env.REACT_APP_API_URL}${device.img}`;
 
  return (
    <Col md={3} className={"mt-3"}>
      <Card className={styles.cardStyle}>
        {is3DModel ? (
          <ThreeModel src={src} size={110} />
        ) : (
          <Image
            width={110}
            height={110}
            src={process.env.REACT_APP_API_URL + device.img}
            alt={`Device ${device.name}`}
          />
        )}
        <div className="text-black-50 mt-1 d-flex align-items-center justify-content-between">
          <div>{device.brand_id.name}</div>

          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div onClick={() => history(DEVICE_ROUTE + "/" + device._id)}>
          {device.name}
        </div>
      </Card>
    </Col>
  );
}

export default DeviceItem
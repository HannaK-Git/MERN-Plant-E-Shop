import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Image,
  Row,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import star from "../assets/star.svg";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { addOrUpdateItem } from "../http/basketAPI";
import { Context } from "../index";
import { useContext } from "react";
import basket from "../store/BasketStore";
import ThreeModel from '../components/ThreeModel';
import { observer } from "mobx-react-lite";

const DevicePage = observer(() => {
  const params = useParams();
  const [device, setDevice] = useState({ info: [] });
  const { user } = useContext(Context);
  // Check if the device image is a 3D model (GLB or GLTF)
  const is3DModel =
    device.img?.toLowerCase().endsWith(".glb") ||
    device.img?.toLowerCase().endsWith(".gltf");
  // Fetch device items when the component mounts
  useEffect(() => {
    fetchOneDevice(params.id).then((data) => setDevice(data));
  }, []);

  // Function to add the item to the basket
  const addToBasket = async () => {
    const basketId = user.basketId || user.user?.basketId;
    const deviceId = device._id;

    try {
      const data = await addOrUpdateItem(basketId, deviceId, 1);
      // Update MobX store with new basket items from backend

      basket.setItems(data.items);
    } catch (e) {
      console.error("Add to basket failed:", e.response?.data || e.message);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          {is3DModel ? (
            <ThreeModel
              src={process.env.REACT_APP_API_URL + device.img}
              size={300}
            />
          ) : (
            <Image
              width={300}
              height={300}
              src={process.env.REACT_APP_API_URL + device.img}
              alt="device image"
            />
          )}
        </Col>
        <Col md={4}>
          <Form className="d-flex flex-column align-items-center">
            <h1>{device.name}</h1>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${star}) no-repeat center center`,
                width: 100,
                height: 100,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Form>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h2>Price: {device.price}$</h2>
           {user.isAuth ? <Button variant="outline-success" onClick={addToBasket}>
              Add to Basket
            </Button> : null}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h2>Details: </h2>
        {device.info.map((info, index) => (
          <Row
            key={info._id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: "1rem",
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;

import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
   
  }, []);

  useEffect(() => {
   
    fetchDevices(
      device.selectedType ? device.selectedType._id : null,
      device.selectedBrand ? device.selectedBrand._id : null,
      device.page,
      device.limit
    ).then((data) => {
      
      device.setDevices(data.devices);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);
 
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;

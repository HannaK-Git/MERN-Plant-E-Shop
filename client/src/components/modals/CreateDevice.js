import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { fetchTypes, fetchBrands, createDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  const [info, setInfo] = useState([]);



  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
   
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

 

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  };

const changeInfo = (key, value, number) => {
  setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
}

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }


  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brand_id", device.selectedBrand?._id);
    formData.append("type_id", device.selectedType?._id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then(data => onHide());
  
    
   
  }

  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new Item
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Type DropDown  */}
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType?.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type._id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Brand DropDown  */}
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand?.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand._id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Set Name  */}
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder={"Enter new Item name"}
          />

          {/* Set Price  */}
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder={"Enter new Item price"}
            type="number"
          />

          {/* Set File  */}
          <Form.Control className="mt-3" onChange={selectFile} type="file" />
          <hr />

          {/* Add Info  */}
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new Description
          </Button>
          {info.map((i) => (
            <Row
              key={i.number}
              className="mt-3"
            >
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Enter the title"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Enter the description"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>

      {/* Footer  "Add new Device" Button */}
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add new Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;

import React, {useState} from 'react'
import {Container, Button} from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

const Admin = () => {

  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-success"}
        className="mt-3 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add new Type
      </Button>
      <Button
        variant={"outline-success"}
        className="mt-3 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add new Brand
      </Button>
      <Button
        variant={"outline-success"}
        className="mt-3 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add new Item
      </Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
    </Container>
  );
}

export default Admin
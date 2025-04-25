
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import basket from '../store/BasketStore';
import { observer } from "mobx-react-lite";
import {addItem, deleteItem}  from '../http/basketAPI';
import { Context } from "../index";
import { useContext } from "react";
import { TbPlant2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CHECKOUT_ROUTE } from "../utils/consts";




const Basket = observer(() => {
 const { user} = useContext(Context) ;
  const navigate = useNavigate();

 // Add new item to basket and update MobX store
  const addNewItem = async (deviceId) => {
    try {
      const data = await addItem(user.basketId, deviceId);
      // Update MobX store with new basket items from backend

      basket.setItems(data.items);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  // remore the item from basket and update MobX store
  const removeItem = async(deviceId) => {
    try {
      const data = await deleteItem(user.basketId, deviceId);
      // Update MobX store with new basket items from backend
      basket.setItems(data.items);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  }
  
  return (
    <Container className="mt-4">
      <h2 className="text-center text-success">
        <TbPlant2 /> {" "}
        Manage your Basket
        {" "} <TbPlant2 />
      </h2>

      <Row>
        <Col md={9}>
          <ListGroup>
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col md={2}>
                  <h5>Image</h5>
                </Col>
                <Col md={2}>
                  <h5>Name</h5>
                </Col>
                <Col md={2}>
                  <h5>Qty</h5>
                </Col>
                <Col md={2}>
                  <h5>Price</h5>
                </Col>
                <Col md={2}></Col>
                <Col md={2}></Col>
              </Row>
            </ListGroup.Item>
            {basket.items?.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={process.env.REACT_APP_API_URL + item.device_id.img}
                      alt={item.name}
                      fluid
                    />
                  </Col>
                  <Col md={2}>
                    <h5>{item.device_id.name}</h5>
                  </Col>
                  <Col md={2}>
                    <h5>{item.quantity}</h5>
                  </Col>
                  <Col md={2}>
                    <strong>${item.device_id.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => addNewItem(item.device_id._id)}
                    >
                      Add
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(item.device_id._id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className="p-3">
            <h4>Total: ${basket.totalPrice}</h4>
            <Button variant="outline-success" className="mt-3 w-100" onClick={() => navigate(CHECKOUT_ROUTE)} disabled={basket.items.length === 0}>
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Basket;

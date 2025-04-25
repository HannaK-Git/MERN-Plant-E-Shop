import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import basket from "../store/BasketStore";
import { clearBasket } from "../http/basketAPI";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { observer } from "mobx-react-lite";
import {Context} from "../index";

const CheckOut = observer(() => {
  const { user } = useContext(Context);
  const [checkOutFinished, setCheckOutFinished] = useState(false);

  const isFormValid = () => {
    return (
      userData.fullName &&
      userData.address &&
      userData.city &&
      userData.zip &&
      userData.country
    );
  }
  const [userData, setUserData] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  // Clear the basket when order isplaced successfully
  const handleClearBasket = async () => {
   
    try {
      
      // Clear the basket after successful payment in DB
      await clearBasket(user.basketId);
      // Clear the basket in the store
      basket.setItems([]);
      setCheckOutFinished(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-success">Checkout</h2>
      {!checkOutFinished ? (
        <Row>
          {/* Left side: Address & Payment Form */}
          <Col md={8}>
            <Card className="mb-4 p-4">
              <h4>Shipping Address</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setUserData({ ...userData, fullName: e.target.value })
                    }
                    required
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                    required
                    type="text"
                    placeholder="123 Main St"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                    required
                    type="text"
                    placeholder="Berlin"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setUserData({ ...userData, zip: e.target.value })
                    }
                    required
                    type="text"
                    placeholder="123"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setUserData({ ...userData, country: e.target.value })
                    }
                    required
                    type="text"
                    placeholder="Germany"
                  />
                </Form.Group>
              </Form>
            </Card>

            <Card className="p-4">
              <h4>Pay with PayPal (Test Mode)</h4>
              <PayPalButtons
                disabled={!isFormValid()}
                fundingSource="paypal"
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: basket.totalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(handleClearBasket);
                }}
              />
            </Card>
          </Col>

          {/* Right side: Order Summary */}
          <Col md={4}>
            <Card className="p-4">
              <h5>Order Summary</h5>
              <ListGroup variant="flush">
                {basket.items?.map((item) => (
                  <ListGroup.Item>
                    {" "}
                    {item.device_id.name} - $
                    {item.device_id.price * item.quantity}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  Total: <strong>$ {basket.totalPrice}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card className="text-center p-4">
              <h4>Thank you for your order!</h4>
              <p>Your order has been placed successfully.</p>
              <Button
                variant="success"
                onClick={() => (window.location.href = "/")}
              >
                Go to Home
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
});

export default CheckOut;

import React, {useContext} from 'react'
import {Context} from '../index'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import style from './styles.module.css';
import { SlBasket } from "react-icons/sl";
import basket from '../store/BasketStore';


const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    user.setUser({});
    user.setIsAuth(false);
    navigate(SHOP_ROUTE); // Redirect to shop page
  };

  // Reset filters and pagination
  const handleLogoClick = () => {
    device.setSelectedType(null);
    device.setSelectedBrand(null);
    device.setPage(1);
    navigate(SHOP_ROUTE);
  };
  return (
    <Navbar className={style.navbar}>
      <Container>
        <NavLink
          style={{ color: "white" }}
          to={SHOP_ROUTE}
          onClick={handleLogoClick}
        >
          Plant Planet
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              className="m-2"
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin Panel
            </Button>

            <Button
              className="m-2"
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              <SlBasket />({basket.totalCount})
            </Button>
            <Button
              className="m-2"
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Log out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Log in
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar
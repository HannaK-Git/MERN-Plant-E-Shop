import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import { Form, Card } from 'react-bootstrap'
import style from './styles.module.css'

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  // Filter out any null values
  const brands = Array.isArray(device.brands)
    ? device.brands.filter((brand) => brand)
    : [];
  return (
    <Form className="d-flex ">
      {brands.map((brand) => (
        <Card
          key={brand._id}
          className={style.menuBtn}
          border={brand._id === device.selectedBrand?._id ? "success" : "dark"}
          onClick={() => device.setSelectedBrand(brand)}
        >
          {brand.name}
        </Card>
      ))}
    </Form>
  );
})

export default BrandBar
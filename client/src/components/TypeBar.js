import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";
import '../index.css';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  // Filter out any null values
  const types = Array.isArray(device.types)
    ? device.types.filter((type) => type)
    : [];

  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          key={type._id}
          style={{ cursor: "pointer" }}
          active={device.selectedType && type._id === device.selectedType._id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;

import { observer } from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Context} from '../index'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
import { toJS } from 'mobx'

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  // Extract the devices array from device.devices
  const devices = toJS(device.devices);

  if (!Array.isArray(devices) || devices.length === 0) {
    return <div className='mt-4 p-2'>No plants available</div>;
  }

  return (
    <Row className="d-flex">
      {devices.map((deviceItem) => (
        <DeviceItem key={deviceItem._id} device={deviceItem}>
          {deviceItem.name}
        </DeviceItem>
      ))}
    </Row>
  );
})

export default DeviceList
import React from 'react'
import ServiceLoaderItem from './service-loader-item'
import {Container, Row, Col} from 'reactstrap'

class ServiceLoaderList extends React.Component {
  render() {
    const arrLoad = Array.apply(null, Array(6))
    return (
      <div className="skeleten-box">
        <Container>
          <Row className="skeleton skeleton__slider">
              {arrLoad.map((val, key) => (
                <Col xs="4" md="3" lg="20" xl="16" key={key}>
                  <div className="loader" style={{width: '100%'}}>
                    <ServiceLoaderItem />
                  </div>
                </Col>)
              )}
          </Row>
        </Container>
      </div>
    )
  }
}

export default ServiceLoaderList

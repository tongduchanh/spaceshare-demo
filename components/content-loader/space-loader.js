import React from 'react'
import SpaceLoaderItem from './space-loader-item'
import {Container, Row, Col} from 'reactstrap'

class ServiceLoaderList extends React.Component {
  render() {
    const arrLoad = Array.apply(null, Array(5))
    return (
      <div className="skeleten-box">
        <Container>
          <Row className="skeleton skeleton__slider">
              {arrLoad.map((val, key) => (
                <Col xs="6" md="4" lg="3" xl="20" key={key}>
                  <div className="loader" style={{width: '100%'}}>
                    <SpaceLoaderItem />
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

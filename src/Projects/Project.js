import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
function Project(props){
  
  const createBulletPoints  = (bullets) => {
    var elements = []
    for (const iter in bullets) {
      elements.push(<li key={iter}>{bullets[iter]}</li>)
    }
    return <ul>{elements}</ul>
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}><h2 style={{textAlign:'left'}}>{props.data.name}</h2></Col>
          <Col xs={3}><h2 style={{textAlign:'center'}}>{props.data.devtime}</h2></Col>
          <Col xs={3}><h2 style={{textAlign:'right'}}>{props.data.type}</h2></Col>
        </Row>
        <Row>
          <Col><p>{props.data.description}</p></Col>
        </Row>
        <Row>
          <Col>{createBulletPoints(props.data.bullets)}</Col>
        </Row>
      </Container>
    </>
  )
}

export default Project
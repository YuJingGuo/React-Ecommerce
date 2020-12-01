import React from 'react';
import { Container, Row } from 'react-bootstrap'

const styles = {
    layer: {
        background: '#F2F2F2',
        // opacity: 0.1,
    },
    layer_txt: {
        color: '#7F7F7F',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '125%',
        padding: '30px 80px'
    }
}
function Footer() {

  return (
    <Container fluid style={styles.layer}>      
      <Row style={styles.layer_txt}>   
        © TINEL Meetup 2020.     
      </Row>
    </Container>
  );
}

export default Footer;

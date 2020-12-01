import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Container, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap'

import MobileWorkShopCard from '../components/MobileWorkShopCard'

import './cart.css'

const styles = {
    icon: {
        padding: '9px 25px',
        alignItems: 'center'
    },
    notification: {
        position: "relative",
        top: '-8px',
        right: '10px',
        padding: '5px',
        borderRadius: '50%',
        backgroundColor: '#00AAE4'    
    } as React.CSSProperties,
    subtotal_sec: {
        padding: 20,
        width: '100%'
    },
    subtotal: {
        fontWeight: 700,
        fontSize: "13.5px",
        lineHeight: "125%",
    },
    subtotal_price: {
        fontWeight: 700,
        fontSize: "32px",
        lineHeight: "125%",
        color: '#1D1D1B'
    },
    subtotal_price_unit: {
        fontWeight: 700,
        fontSize: "18.9px",
        lineHeight: "125%",
        color: '#1D1D1B'        
    },
    checkoutBtn: {
        background: "#0097CC",
        boxShadow: "1px 2px 8px rgba(127, 127, 127, 0.25)",
        borderRadius: "6px",
        fontWeight: 700,
        fontSize: "18.4px",
        lineHeight: "125%",
        width: "100%",
        marginTop: 40
    },
    back_shop: {
        background: "#FFC80C",
        borderRadius: "8px",
        padding: "18.5px 42.5px",
        fontSize: "18px",
        lineHeight: "125%",
        color: "#1D1D1B"
    },
    success: {
        padding: "90px 60px"
    },
    txt: {
        paddingBottom: 40
    }
}
function CartPage(props: any) {
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [validated, setValidated] = useState(false);
    let totalPrice = 0;

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {      
      const form = event.currentTarget;
      
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
      } else {
        setSubmitted(true);
      }       
    };
  

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);        
        setSubmitted(false);
    };    

    const handleClick = () => {
        window.location.href = '/'
    }

    return (
    // Pass on our props
        <Menu {...props}>
            <Container>
                <Row style={styles.icon}>                    
                    <Image src={process.env.PUBLIC_URL + "/images/eva_shopping-cart-outline.png"} alt="" /> 
                    { 
                        props.orders.length > 0 && <span style={styles.notification}></span> 
                    }        
                    <h6>
                    {
                        props.orders.length > 0 ? props.orders.length + ' WorkShops' : 'Cart is Empty'
                    }   
                    </h6>                                       
                </Row>
                <Row>
                    {
                        props.orders.map((item: any, index:number) => {
                            totalPrice = totalPrice + item.total
                            return <div key={index} style={{width: '100%'}}>                                
                                <MobileWorkShopCard item={item}/>                            
                            </div>
                        })
                    }
                    {
                        props.orders.length > 0 && <div style={styles.subtotal_sec}>
                            <h6 style={styles.subtotal}>SUBTOTAL</h6>
                            <h6 style={styles.subtotal_price}>{totalPrice},00<span style={styles.subtotal_price_unit}>EUR</span></h6>
                            <Button style={styles.checkoutBtn} onClick={handleShow}>Checkout</Button>
                        </div>
                    }

                        <Modal show={show} onHide={handleClose}>
                            {
                                !submitted?
                                <>
                                <Modal.Header closeButton>
                                    <Modal.Title>Checkout</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>                                        
                                        <Form.Group controlId="formGridFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" defaultValue="Marko" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Your first name contains invalid symbol!
                                            </Form.Control.Feedback>
                                        </Form.Group>                                    

                                        <Form.Group controlId="formGridLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" defaultValue="Type your last name here" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Your last name contains invalid symbol!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        
                                        <Form.Group controlId="formGridEmail">
                                            <Form.Label>Email Addres</Form.Label>
                                            <Form.Control type="email" defaultValue="Type your email address here" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Your email contains invalid symbol!
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control as="select">
                                                    <option defaultValue="Other">Other</option>
                                                    <option>male</option>
                                                    <option>female</option>
                                                </Form.Control>
                                            </Form.Group>                                        
                                        </Form.Row>                                    

                                        <Form.Group controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control defaultValue="Type your address here" />
                                        </Form.Group>

                                        <Form.Group controlId="validationCustom05">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" defaultValue="Zip Code" required />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid zip.
                                            </Form.Control.Feedback>
                                        </Form.Group>                                    
                                        
                                        <Form.Group>
                                            <Form.Check
                                                required
                                                label="I agree"
                                                feedback="You must agree before submitting."
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                </>:
                                <>                                    
                                    <Modal.Body>
                                        <div style={styles.success}>
                                            <h6>What is Lorem Ipsum Lorem Ipsum is</h6>
                                            <h6 style={styles.txt}>simply dummy text of the printing.</h6>                                            
                                            <Button style={styles.back_shop} onClick={handleClick}>Back to Shop</Button>     
                                        </div>
                                    </Modal.Body>
                                </>
                            }
                        </Modal>                    
                </Row>
            </Container>
        </Menu>
  );
}

export default CartPage
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button, Form } from 'react-bootstrap'
import {
    Link,
    // RouteComponentProps
} from "react-router-dom";
import Moment from 'react-moment';
import WorkShopCard from '../components/WorkShopCard'

const uri = "http://localhost:3000/"

const styles = {
    arrow_txt: {
        color: '#1D1D1B',
        fontWeight: 700,
        fontSize: "15px",
        lineHeight: "125%",
    },
    bg_img: {
        width: '100%',
        height: '382px',
        borderRadius: 8,
        paddingBottom: 60
    },
    date: {
        color: '#0D0D0D',
        fontSize: 18,
        lineHeight: '22.5px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',        
    },
    title: {
        fontSize: 60,
        color: '#0097CC',
        lineHeight: '72px',
        fontWeight: 700
    },
    user: {
        fontSize: 27,
        color: '#1D1D1B',
        lineHeight: '33.75px',
        fontWeight: 700
    },
    desc: {
        fontSize: 18,
        color: '#1D1D1B',
        lineHeight: '27px',
    },
    txt: {
        fontSize: 18,
        color: '#0D0D0D',
        lineHeight: '22.5px',
        fontWeight: 700
    },
    card_bg: {
        boxShadow: '1px 2px 16px rgba(127, 127, 127, 0.25)',
        borderRadius: '8px'
    },
    card_title: {
        fontWeight: 700,
        fontSize: "23px",
        lineHeight: "125%",
        color: '#1D1D1B'
    },
    card_price: {
        fontWeight: 700,
        fontSize: "40px",
        lineHeight: "125%",
        color: '#1D1D1B'
    },    
    addCartButton: {
        background: '#FFC80C',        
        borderColor: '#FFC80C',
        color: '#1D1D1B',
        padding: '9.5px 42.5px',
        borderRadius: '8px'
    },
    sub_title: {
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "125%",
        color: "#7F7F7F",
        paddingTop: 20
    },
    similar_section: {
        background: "#F2F2F2"
    },
    similar_section_title: {
        fontWeight: 700,
        fontSize: "40px",
        lineHeight: "125%",
        color: '#1D1D1B',
        paddingTop: 80,
        paddingBottom: 40
    }
}

// type TParams = { id: string };

interface WorkShopItem {
    title: string,
    category: string,
    date: string,
    desc: string,
    id: string,
    imageUrl: string,
    price: string,
    userId: string
}

interface User {
    email: string,     
    password: string,
    id: string, 
    name: string,
}

const initValue = {
    title: '',
    category: '',
    date: '',
    desc: '',
    id: '',
    imageUrl: '',
    price: '',
    userId: ''
}

const initUser =  {
    email: '',     
    password: '',
    id: '', 
    name: '',
}
   

// function WorkShopDetail({ match }: RouteComponentProps<TParams>) {
function WorkShopDetail(props: any) { 
    const [ workshops, setWorkshops ] = useState([])  
    const [ workshopitem, setWorkshopitem ] = useState<WorkShopItem>(initValue)
    const [ user, setUser ] = useState<User>(initUser)
    const [ number, setNumber ] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetch(uri + 'workshops/' + props.match.params.id).then(res => res.json()).then(res => setWorkshopitem(res))
            await fetch(uri + 'users/' + workshopitem.userId).then(res => res.json()).then(res => setUser(res) )
            await fetch(uri + 'workshops').then(res => res.json()).then(res => {    
                const temp_array = res.filter((el: { category: string; }) => el.category === workshopitem.category);
                setWorkshops(temp_array);                  
            })                                       
        }        
        fetchData();
    }, [props.match.params.id, workshopitem.category, workshopitem.userId])    

    const addCart = () => {        
        let products = [{
            title: workshopitem.title,
            category: workshopitem.category,
            date: workshopitem.date,
            desc: workshopitem.desc,
            id: workshopitem.id,
            imageUrl: workshopitem.imageUrl,
            price: workshopitem.price,
            userId: workshopitem.userId,
            quantity: number
        }]
        
        let total =  parseInt(workshopitem.price) * number

        fetch(uri + 'orders', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({products, total})
        }).then(res => res.json())
        .then(res => props.fetchOrders())
    }

    const handleChange = (e: any) => {
        setNumber(e.target.value)
    }

  return (
    <Container fluid>      
        <Row style={{paddingTop: 100}}>
            <Col md={3}>
                <Link to="/">
                    <Image src={process.env.PUBLIC_URL + '/images/Vector.png'} style={{width: 15}}/><span style={styles.arrow_txt}> Back </span>
                </Link>
            </Col>            
        </Row>
        <Row>
            <Col md={3}>
            </Col>
            <Col md={9}>                  
                <Row>
                    <Col>              
                        <Image src={workshopitem.imageUrl} style={styles.bg_img}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col style={styles.date}>
                                <Image src="../images/eva_calendar-outline.png" alt=""/>
                                <Moment format="MM.DD.YYYY">{workshopitem.date}</Moment>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Image src="../images/eva_clock-outline.png" alt=""/>
                                <Moment format="hh:mm">{workshopitem.date}</Moment>h
                            </Col>
                        </Row>
                        
                        <br></br>
                        
                        <Row>
                            <Col>
                                <h1 style={styles.title}>{workshopitem.title}</h1>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <span style={styles.txt}>WITH</span> &nbsp;
                                <span style={styles.user}>{user.name}</span>
                            </Col>
                        </Row>

                        <br></br>

                        <Row>
                            <Col>
                                <h6 style={styles.desc}>{workshopitem.desc}</h6>
                            </Col>
                        </Row>

                        <br></br>
                        <br></br>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col>
                                <Card style={styles.card_bg} className="mobile-buy-your-ticket">
                                    <Card.Body>
                                        <Card.Title>Buy Your Ticket</Card.Title>                                        
                                        <Card.Text>
                                            <span style={styles.card_price}>{workshopitem.price}, 00</span>
                                            <span style={styles.card_title}>EUR</span>
                                        </Card.Text>                                        
                                        <Row>
                                            <Col md={4}>                                                
                                                <Form.Group>                                                
                                                    <Form.Control as="select" size="lg" onChange={handleChange} >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={8}>
                                                <Button style={styles.addCartButton} onClick={addCart}>Add to cart</Button>
                                                <Card.Subtitle className="mb-2 text-muted" style={styles.sub_title}>Subtotal {parseInt(workshopitem.price) * number},000 HRK</Card.Subtitle>
                                            </Col>
                                        </Row>                                                                           
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>        
        <Row style={styles.similar_section}>
            <Col md={3}></Col>
            <Col md={9}>       
                <Row>
                    <Col>
                        <h1 style={styles.similar_section_title}>Similar Workshops</h1>
                    </Col>
                </Row>                
                <WorkShopCard workshops={workshops}/>                                    
            </Col>
        </Row>
    </Container>
  );
}

export default WorkShopDetail;

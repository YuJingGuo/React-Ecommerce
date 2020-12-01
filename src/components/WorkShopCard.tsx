import React from 'react';
import { Row, Col, Card , Button, Image} from 'react-bootstrap'
import Moment from 'react-moment';
import {
    Link
} from "react-router-dom";

const styles = {
    title: {
        fontSize: 27,
        color: '#0097CC',
        lineHeight: '125%',
        fontWeight: 700
    },
    date: {
        color: '#0D0D0D',
        fontSize: 15,
        lineHeight: '125%',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center'
    },
    price: {
        color: '#1D1D1B',
        lineHeight: '125%',
        fontSize: 29,
        fontWeight: 700
    },
    price_unit: {
        color: '#1D1D1B',
        lineHeight: '125%',
        fontSize: 15,
        fontWeight: 700
    },
    addCartButton: {
        background: '#FFC80C',
        width: '100%',
        borderColor: '#FFC80C',
        color: '#1D1D1B',        
        fontSize: 18,
        lineHeight: '125%',
        fontWeight: 700
    }
}

function WorkShopCard(props: any) {
    return(
        <Row>            
            {
                props.workshops.length < 9 ? props.workshops.map((item: any, idx: number) =>                
                    <Col md={4} key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Link to={`/workshops/${item.id}`}>     
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={item['imageUrl']} />
                                <Card.Body>                            
                                    <Card.Text style={styles.date}>                                    
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_calendar-outline.png"} alt=""/>
                                        <Moment format="MM.DD.YYYY">{item['date']}</Moment>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_clock-outline.png"} alt=""/>
                                        <Moment format="hh:mm">{item['date']}</Moment>h
                                    </Card.Text>
                                    <Card.Title style={styles.title}>{item['title']}</Card.Title>                                
                                    <Card.Text style={styles.price}>
                                        {item['price']},00 <span style={styles.price_unit}>EUR</span>
                                    </Card.Text>
                                    <Button style={styles.addCartButton}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ) : props.loadmore === false ? props.workshops.map((item: any, idx: number) =>                                                             
                    <Col md={4} key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        {   
                        idx < 9&&                     
                        <Link to={`/workshops/${item.id}`}>     
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={item['imageUrl']} />
                                <Card.Body>                            
                                    <Card.Text style={styles.date}>                                    
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_calendar-outline.png"} alt=""/>
                                        <Moment format="MM.DD.YYYY">{item['date']}</Moment>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_clock-outline.png"} alt=""/>
                                        <Moment format="hh:mm">{item['date']}</Moment>h
                                    </Card.Text>
                                    <Card.Title style={styles.title}>{item['title']}</Card.Title>                                
                                    <Card.Text style={styles.price}>
                                        {item['price']},00 <span style={styles.price_unit}>EUR</span>
                                    </Card.Text>
                                    <Button style={styles.addCartButton}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Link>
                        }
                    </Col>                    
                ) : props.workshops.map((item: any, idx: number) =>                
                    <Col md={4} key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Link to={`/workshops/${item.id}`}>     
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={item['imageUrl']} />
                                <Card.Body>                            
                                    <Card.Text style={styles.date}>                                    
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_calendar-outline.png"} alt=""/>
                                        <Moment format="MM.DD.YYYY">{item['date']}</Moment>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Image src={process.env.PUBLIC_URL + "/images/eva_clock-outline.png"} alt=""/>
                                        <Moment format="hh:mm">{item['date']}</Moment>h
                                    </Card.Text>
                                    <Card.Title style={styles.title}>{item['title']}</Card.Title>                                
                                    <Card.Text style={styles.price}>
                                        {item['price']},00 <span style={styles.price_unit}>EUR</span>
                                    </Card.Text>
                                    <Button style={styles.addCartButton}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }   
        </Row>
    )
}

export default WorkShopCard;
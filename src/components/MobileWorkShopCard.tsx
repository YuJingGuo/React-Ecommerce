import React from 'react';
import { Image} from 'react-bootstrap'

const styles = {
    card_img: {
        width: 80,
        height: '100%'
    },
    title: {
        fontWeight: 700,
        fontSize: '18.9px',
        lineHeight: '125%',
        color: '#0097CC',
        paddingTop: 20,
        // paddingBottom: 20
    },
    price: {
        fontWeight: 700,
        fontSize: '20.3px',
        lineHeight: '125%',
        color: '#1D1D1B',
        paddingTop: 10,
        paddingBottom: 10
    },
    price_unit: {
        fontSize: 13.5
    },
    title_sec: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    quantity_sec: {
        display: "flex",
        alignItems: "center"
    }
}

function MobileWorkShopCard(props: any) {
    return (
        <div className="card">
            <div className="row no-gutters">
                <div className="col-auto">
                    <Image src={props.item.products[0].imageUrl} className="img-fluid mobile-img-fluid" alt="" style={styles.card_img}/>
                </div>
                <div className="col">
                    <div className="card-block px-2">
                        <div style={styles.title_sec}>
                            <h4 className="card-title" style={styles.title}>
                                {props.item.products[0].title}
                            </h4>
                            <Image src={process.env.PUBLIC_URL + "/images/remove_ico.png"}/>
                        </div>
                        <div style={styles.quantity_sec}>
                            <select className="form-control">
                                <option defaultValue={props.item.products[0].quantity}>{props.item.products[0].quantity}</option>                                
                            </select>&nbsp;&nbsp;
                            <p className="card-text" style={styles.price}>
                                {props.item.total},00<span style={styles.price_unit}>EUR</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default MobileWorkShopCard;
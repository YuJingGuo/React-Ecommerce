import React, { useState, useEffect } from 'react';
import WorkShopCard from '../components/WorkShopCard'
import { Container, Row, Col, ListGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap'

const uri = "http://localhost:3000/"

const capitalizeFunc = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = {
  categorylist: {
    color: '#1D1D1B',
    border: 'none',
    fontSize: 23,
    lineHeight: '125%',
    fontWeight: 700,
    paddingLeft: 0,
    cursor: 'pointer'
  },
  load_more: {    
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "125%",
    color: "#1D1D1B",
    borderBottom: '2px solid #0097CC',    
  },
  load_more_txt: {
    marginBottom: 55,
    textAlign: "center",
  } as React.CSSProperties
}

function Home() {
  
  const [ categories, setCategories ] = useState([]);
  const [ workshops, setWorkshops ] = useState([])  
  const [ loadmore, setLoadmore ] = useState(false)
  const [ active, setActive ] = useState(5)  
  const [ category, setCategory ] = useState('All')  
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await fetch(uri + 'categories').then(res => res.json()).then(categories => setCategories(categories))      
      await fetch(uri + 'workshops').then(res => res.json()).then(res => setWorkshops(res))    
    }
    fetchData();    
    setLoading(true)
  }, [])

  const reFetchData = (key: string, index: number) => {    
    setLoading(false)
    fetch(uri + 'workshops').then(res => res.json()).then(res => {
      const temp_array = res.filter((el: { category: string; }) => el.category === key)
      setWorkshops(temp_array)      
    })
    setCategory(key)
    setActive(index)
    setLoading(true)
  }

  const fetchAll = () => {
    setLoading(false)
    setLoadmore(false)
    fetch(uri + 'workshops').then(res => res.json()).then(res => setWorkshops(res))
    setActive(5)
    setCategory('All')
    setLoading(true)
  }

  return (
    <Container fluid >      
      <Row style={{paddingTop: 100}}>
        <Col md={3}>
          <div style={{display: "none"}} id="mobile-category-btn">
            <DropdownButton title={capitalizeFunc(category)} variant="secondary" >
              <Dropdown.Item onClick={() => fetchAll()}>All</Dropdown.Item>            
              {
                categories.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => reFetchData(item, index)}>
                      {/* <Image src={process.env.PUBLIC_URL + "/images/eva_flash-outline.png"} alt=""/> */}
                      {capitalizeFunc(item)}
                    </Dropdown.Item>
                  )
                })
              }
            </DropdownButton>
          </div>
        </Col>
        <Col md={9}>
          <h1>WorkShops</h1>          
        </Col>
      </Row>
      <Row>
        <Col className="mobile_filter_category_txt" md={3} style={{color: '#7F7F7F'}}>Filter by category:</Col>
        <Col md={9} style={{color: '#7F7F7F'}}>Displayed {workshops.length}</Col>
      </Row>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush" className="mobile-list-group">
            <ListGroup.Item active={ active === 5? true : false } style={styles.categorylist} onClick={() => fetchAll()}>All</ListGroup.Item>
            {
              categories.map((item, index) => {
                return (
                  <ListGroup.Item active={ active===index? true : false } key={index} style={styles.categorylist} onClick={() => reFetchData(item, index)}>
                    {/* <Image src={process.env.PUBLIC_URL + "/images/eva_flash-outline.png"} alt=""/> */}
                    {capitalizeFunc(item)}
                  </ListGroup.Item>
                )
              })
            }
          </ListGroup>         

        </Col>
        <Col md={9}>
          {
            !loading&&<Spinner animation="border" variant="warning" />
          }          
          <WorkShopCard workshops={workshops} loadmore={loadmore}/>
          {
            workshops.length > 9 && !loadmore &&<h6 style={styles.load_more_txt}><span style={styles.load_more} onClick={() => setLoadmore(true)}>Load More</span></h6>
          }
        </Col>        
      </Row>
    </Container>
  );
}

export default Home;

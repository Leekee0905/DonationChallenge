import { Container, Form, Button, Carousel, CardGroup, CarouselItem, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchPage from "./challengepage/SearchPage";
import ChallengeList from "../components/ChallengeList";


export default function Home(){

  const navigate = useNavigate();
  const [frontData, setFrontData] = useState([]);
  const [backData, setBackData] = useState();
  const [search, setSearch] = useState("");


  const onChangeSearch = (e) => {
    const currentSearch = e.target.value;
    setSearch(currentSearch);
  }


  const onSubmitSearch= async(e) => {
    e.preventDefault();
    await axios.get('/search/challenge',{
      params:{
        keyword : search
      }
    })
    .then((res)=>{
      navigate('/challenge/list/search/' + search)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  
  useEffect(()=>{
    axios.get('/main/challenges')
    .then((res)=>{
      console.log(res.data.length)
      setFrontData(res.data.slice(0,4))
      setBackData(res.data.slice(4,8))
    })
  },[])

  console.log(frontData)

  return (
    <div>
      <div className="bannername">
        Home
      </div>
      <section>
        <img width={"100%"} height={"350px"} src={process.env.PUBLIC_URL+'/img/homebanner.png'} />
      </section>
      <Container className='search-container'>
        <Form onSubmit={onSubmitSearch} className="search_wrapper">
          <Form.Control
            value={search}
            onChange={onChangeSearch}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <button className="button e_search_submit">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </button>
          </Form>
      </Container>
      
      
      <Container className="carousel-container">
      
        <Row lg={24} md={24} sm={12} xs={12} >
        <h3 className="carouselname">Top 8 인기 챌린지</h3>
            <Carousel variant="dark" indicators={false}>
              <CarouselItem >
                <CardGroup>
                {
                  frontData ? frontData.map(list=>{
                    return(
                      <Col lg={3} md={3} sm={3} xs={12} key={list.id}>
                        <ChallengeList key={list.id} list={list} />
                      </Col>
                    )
                  }):''
                }
                </CardGroup>
              </CarouselItem>
              <CarouselItem>
                <CardGroup>
                  {
                    backData ? backData.map(list=>{
                      return(
                        <Col lg={3} md={3} sm={3} xs={12} key={list.id}>
                        <ChallengeList key={list.id} list={list} />
                        </Col>
                      )
                    }):''
                  }
                </CardGroup>
              </CarouselItem>
            </Carousel>
        </Row>
      </Container>
    </div>
  )
}
import { Container, Row, Col, CardGroup } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ChallengeList from "../../components/ChallengeList";
import './CategoryDetail.css'

export default function CategoryDetail(){
  const [littlebanner, setLittleBanner] = useState("");
  const [bannerpath, setBannerPath] = useState("");
  const [bannerdetail, setBannerDetail] = useState("");
  const [categoryData, setCategoryData] = useState();
  const params = useParams()
  useEffect(()=>{
    const getCategory = async() =>{
      await axios.get('/category/challenge',{
        params:{
          destination: params.destination
        }
      }).then((res)=>{
        setCategoryData(res.data)
        if(params.destination === '굿네이버스'){
          setLittleBanner(process.env.PUBLIC_URL+"/img/goodbanner.png")
        }else if(params.destination === '초록우산어린이재단'){
          setLittleBanner(process.env.PUBLIC_URL+"/img/greenbanner.png")
        }else if(params.destination === '적십자'){
          setLittleBanner(process.env.PUBLIC_URL+"/img/redcrossbanner.png")
        }else if(params.destination === '유니세프'){
          setLittleBanner(process.env.PUBLIC_URL+"/img/unicefbanner.png")
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
    getCategory();
    
  },[])

  return (
  <Container>
    <img className="categorybanner" width={"100%"} height={"300px"} src={littlebanner}/>
    <Row xxl={4} xl={4} lg={3} md={3} sm ={2} xs ={1}>
    {categoryData ? categoryData.map(list=>{
      return(
        <Col className='md' key={list.id}>
          <CardGroup>
            <ChallengeList list={list} />
          </CardGroup>
        </Col>
      )
    }): ''}
    </Row>
  </Container>
  )
}
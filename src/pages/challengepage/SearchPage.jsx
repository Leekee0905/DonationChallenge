import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup } from "react-bootstrap"
import ChallengeList from "../../components/ChallengeList"

export default function SearchPage(){
  const params = useParams()
  const [searchData, setSearchData] = useState("")
  useEffect(()=>{
    axios.get('/search/challenge',
    {
      params:{
        keyword: params.search
      }
    })
    .then((res)=>{
      setSearchData(res.data)
      console.log(res.data)
    })
  },[])
  return(
    <Container>
      <section>
        <img className="challengebanner" width={"100%"} height={"200px"} src={process.env.PUBLIC_URL+'/img/homebanner.png'} />
      </section>
      <Row xxl={4} xl={4} lg={3} md={3} sm ={2} xs ={1}>
      {searchData ? searchData.map(list=>{
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
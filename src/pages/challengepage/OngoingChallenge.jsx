import ChallengeList from "../../components/ChallengeList"
import axios from "axios"
import { useState, useEffect } from "react"
import { Container, Col, Row, CardGroup } from "react-bootstrap"
import './OngoingChallenge.css'

export default function OngoinChallenge(){
  const [challenges, setChallenges] = useState("") 
  useEffect(()=>{
    axios({
      method: 'get',
      url: '/challenge/list'
    })
    .then((res)=>{
      setChallenges(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return(
    <Container>
      <section>
        <img className="challengebanner" width={"100%"} height={"300px"} src={process.env.PUBLIC_URL+'/img/homebanner.png'} />
      </section>
      <Row lg={24} md={24} sm={12} xs={12}>
        <CardGroup>
      {challenges ? challenges.map(list=>{
        return(
          <Col lg={3} md={3} sm={3} xs={12} key={list.id}>
              <ChallengeList list={list} />
          </Col>
        )
      }): ''}
        </CardGroup>
      </Row>
    </Container>
  )
}
import ChallengeList from "../../components/ChallengeList"
import { useState, useEffect } from "react"
import { Container, Row, Col, CardGroup } from "react-bootstrap"
import axios from "axios"
import './EndChallenge.css'

export default function EndedChallenge(){
  const [endChallenges, setEndChallenges] = useState("") 
  useEffect(()=>{
    axios({
      method: 'get',
      url: '/challenge/list/end'
    })
    .then((res)=>{
      setEndChallenges(res.data)
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
          {endChallenges ? endChallenges.map(list=>{
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
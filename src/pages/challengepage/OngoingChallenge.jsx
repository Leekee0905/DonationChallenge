import ChallengeList from "../../components/ChallengeList"
import axios from "axios"
import { useState, useEffect } from "react"
import { Container, Col, Row } from "react-bootstrap"

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
      <Row xxl={3} xl={2} lg={2} md={1} sm ={1} xs ={1}>
      {challenges ? challenges.map(list=>{
        console.log(list.id)
        return(
          <Col className='md' key={list.id}>
            <ChallengeList list={list} />
          </Col>
        )
      }): ''}
      </Row>
    </Container>
  )
}
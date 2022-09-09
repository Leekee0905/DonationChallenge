import ChallengeList from "../../components/ChallengeList"
import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"

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
      <Row xxl={3} xl={2} lg={2} md={1} sm ={1} xs ={1}>
      {endChallenges ? endChallenges.map(list=>{
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
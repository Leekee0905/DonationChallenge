import { useEffect, useState } from "react"
import axios from "axios"
import {Row, Col, Container} from 'react-bootstrap'
import ChallengeList from "../../components/ChallengeList"

/** 유저가 만든 챌린지 */
export default function CreatedChallenge(){
  const [create, setCreate] = useState("")
  useEffect(()=>{
    axios.get('/mypage/challenges/create')
    .then((res)=>{
      setCreate(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  return(
    <Container>
      <h3>내가 만든 챌린지</h3>
        <Row lg={2} md={1} xs={1}>
          {create ? create.map(list=>
          {
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
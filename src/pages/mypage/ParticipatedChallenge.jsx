import { useEffect, useState } from "react"
import axios from "axios"
import {Row, Col, Container} from 'react-bootstrap'
import ChallengeList from "../../components/ChallengeList"
import './ParticipatedChallenge.css'

/** 유저가 참가한 챌린지 */
export default function ParticipatedChallenge(){
  const [participate, setParticipate] = useState("")
  useEffect(()=>{
    axios.get('/mypage/challenges/participation')
    .then((res)=>{
      setParticipate(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  return(
    <Container className="particpated">
      <h3>내가 참여한 챌린지</h3>
        <Row lg={24} md={24} sm={12} xs={12}>
          {participate ? participate.map(list=>
          {
              return(
                <Col lg={3} md={3} sm={3} xs={12} key={list.id}>
                  <ChallengeList list={list} />
                </Col>
                )
          }): ''}
        </Row> 
    </Container>
  )
}
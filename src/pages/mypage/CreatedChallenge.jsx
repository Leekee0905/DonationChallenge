import { useEffect, useState } from "react"
import axios from "axios"
import {Row, Col, Container} from 'react-bootstrap'
import ChallengeList from "../../components/ChallengeList"
import './CreateChallenge.css'

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
    <Container className="createbyme">
      <h3>내가 만든 챌린지</h3>
        <Row lg={24} md={24} sm={12} xs={12}>
          {create ? create.map(list=>
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
import { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import ChallengeList from "../../components/ChallengeList"
import './LikeChallenge.css'

export default function LikeChallenge(){
  const [like, setLike] = useState("");
  useEffect(()=>{
    axios.get('/mypage/challenges/like')
    .then((res)=>{
      setLike(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  return(
    <Container className="likechallenge">
      <h3>좋아요한 챌린지</h3>
        <Row lg={24} md={24} sm={12} xs={12}>
          {like ? like.map(list=>
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
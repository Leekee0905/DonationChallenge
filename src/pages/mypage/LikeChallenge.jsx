import { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import ChallengeList from "../../components/ChallengeList"

export default function LikeChallenge(){
  const [like, setLike] = useState("")
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
    <Container>
      <h3>좋아요한 챌린지</h3>
        <Row lg={2} md={1} xs={1}>
          {like ? like.map(list=>
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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import ChallengeList from '../components/ChallengeList'
import './Challenge.css'


export default function Challenge(){
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  function toUpload(){
    if(sessionStorage.getItem === 'null'){
      navigate('/member/login')
    } else {
      navigate('/challenge/upload')
    }
  }

  useEffect(()=>{
    axios({
      method: 'get',
      url: '/challenge/list'
    })
    .then((res)=>{
      setChallenges(res.data)
    })
  },[])


  return(
    <div>
      <Container>
        <h1>여기에 이미지 들어감<br/>조금크게<br/><br/><br/>요정도?<br/></h1>
      </Container>
      <Container fluid='md'>
        <Row lg={3} md={2} xs={1}>
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
      <Button onClick={toUpload} className='uploadbtn' >업로드</Button>
    </div>
  )
}
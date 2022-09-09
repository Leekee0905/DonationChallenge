import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom' 

import ChallengeList from '../../components/ChallengeList'
import './Challenge.css'
import EndedChallenge from './EndedChallenge'
import OngoingChallenge from './OngoingChallenge'

// 챌린지 리스트 페이지
export default function Challenge(){
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  
  /**
   * 챌린지 업로드 페이지로 이동하는 함수
   * 세션 스토리지를 통해 로그인 여부 확인해서 로그인 안되어 있으면 로그인 페이지로 아니면 업로드 페이지 이동
   */
  function toUpload(){
    if(sessionStorage.getItem === 'null'){
      navigate('/member/login')
    } else {
      navigate('/challenge/upload')
    }
  }




  return(
    <div>
      <Container>
        <Carousel>
        <Carousel.Item>
          <img
            height={300}
            className="d-block w-100"
            src={process.env.PUBLIC_URL+'/winter.jpeg'}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
      </Container>
    

      <section>

      <Container>
        <Row>
          <Col xs={2} md={2} lg={2}>
            <aside className="column sidebar_left">
              <Container className="menu_container">
                <p className="menu-label">카테고리</p>
                <ul className="menu-list">
                  <li>
                    <Link to='/challenge/list'>진행중인 챌린지</Link>
                  </li>
                  <li>
                    <Link to='/challenge/list/end'>종료된 챌린지</Link>
                  </li>
                </ul>
              </Container>
            </aside>
          </Col>

          <Col lg={10} md={10} xs={10}>
            
              <Routes>
                <Route path='/*' element={<OngoingChallenge/>}/>
                <Route path='/end' element={<EndedChallenge/>}/>
              </Routes>

          </Col> 
        </Row>
      </Container>

      {/* <Container fluid='md'>
        <Col lg={3} md={2} xs={1}>
            {challenges ? challenges.map(list=>{
              console.log(list.id)
              return(
                <Col className='md' key={list.id}>
                  <ChallengeList list={list} />
                </Col>
              )
            }): ''}
        </Col> 
        </Row>
      </Container> */}
    </section>
    <Button onClick={toUpload} className='uploadbtn' >업로드</Button>
    </div>
  )
}
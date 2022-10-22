import { Button, Container, Row, Col, Accordion } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Route,Routes, Link} from 'react-router-dom' 

import './Challenge.css'
import EndedChallenge from './EndedChallenge'
import CategoryDetail from './CategoryDetail'
import OngoingChallenge from './OngoingChallenge'
import SearchPage from './SearchPage'


// 챌린지 리스트 페이지
export default function Challenge(){
  const navigate = useNavigate();
  const donation = [
    '적십자',
    '굿네이버스',
    '유니세프',
    '초록우산어린이재단'
  ]

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
    <div className='challenge-wrapper'>
      <section className='challenge-content'>
      <Container className="bannername">
        챌린지 목록
      </Container>
      <Container>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <aside className="column sidebar_left">
              <Container className="menu_container">
                <p className="menu-label">기부처</p>
                <ul className='menu-list'>
                  <li>
                    <a href={'/challenge/list/category/'+donation[0]}>{donation[0]}</a>
                  </li>
                  <li>
                    <a href={'/challenge/list/category/'+donation[1]}>{donation[1]}</a>
                  </li>
                  <li>
                    <a href={'/challenge/list/category/'+donation[2]}>{donation[2]}</a>
                  </li>
                  <li>
                    <a href={'/challenge/list/category/'+donation[3]}>{donation[3]}</a>
                  </li>
                </ul>
                <ul className="menu-list">
                  <li>
                    <a href='/challenge/list'>진행중인 챌린지</a>
                  </li>
                  <li>
                    <a href='/challenge/list/end'>종료된 챌린지</a>
                  </li>
                </ul>
              </Container>
            </aside>
          </Col>
          <Col lg={9} md={9} xs={9}>
              <Routes>
                <Route path='/*' element={<OngoingChallenge/>}/>
                <Route path='/end' element={<EndedChallenge/>}/>
                <Route path='/search/:search' element={<SearchPage/>} />
                <Route path='/category/:destination' element={<CategoryDetail/>}/>
              </Routes>
          </Col> 
        </Row>
      </Container>
    </section>
    <Button onClick={toUpload} className='uploadbtn' >업로드</Button>
    </div>
  )
}
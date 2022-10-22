import { Container, Row, Col } from "react-bootstrap"
import { Link} from "react-router-dom";
import UserInfo from "./UserInfo";
import './Mypage.css'
import { Routes, Route } from "react-router-dom";
import CreatedChallenge from "./CreatedChallenge";
import ParticipatedChallenge from "./ParticipatedChallenge";
import LikeChallenge from "./LikeChallenge";
import MyReplyList from "./MyReplyList";
import MyPayment from "./MyPayment";



export default function Mypage(){
  return(
    <section>
      <Container className="bannername">
        마이페이지
      </Container>
      <Container className="mypage_body">
      <Row>
        <Col xs={3} md={3} lg={3}>
          <aside className="column sidebar_left">
            <Container className="menu_container">
              <p className="mypage-logo">마이페이지</p>
              <p className="menu-label">회원관리</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage'>회원 정보</Link>
                </li>
              </ul>

              <p className="menu-label">챌린지 관리</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage/challenges/create'>내가 만든 챌린지</Link>
                </li>
                <li>
                  <Link to='/mypage/challenges/participation'>참가한 챌린지</Link>
                </li>
                <li>
                  <Link to='/mypage/challenges/like'>좋아요한 챌린지</Link>
                </li>
              </ul>

              <p className="menu-label">내가 단 댓글</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage/challenges/reply'>댓글</Link>
                </li>
              </ul>

              <p className="menu-label">내 기부 내역</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage/challenges/mypayment'>기부 내역</Link>
                </li>
              </ul>
            </Container>
          </aside>
        </Col>
        <Col xs={9} md={9} lg={9}>
          <Routes>
            <Route path="/*" element={<UserInfo />}/>
            <Route path="/challenges/create" element={<CreatedChallenge/>}/>
            <Route path="/challenges/participation" element={<ParticipatedChallenge/>} />
            <Route path="/challenges/like" element={<LikeChallenge/>} />
            <Route path="/challenges/reply" element={<MyReplyList/>} />
            <Route path="/challenges/mypayment" element={<MyPayment/>} />
          </Routes>
        </Col>
      </Row>
      </Container>
    </section>
  )
}
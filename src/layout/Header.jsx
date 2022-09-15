import { Link, Navigate, useNavigate } from "react-router-dom"
import { React, useEffect, useState } from "react"
import axios from "axios"
import { Form, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"

/**
 * 로그인 여부에 따른 헤더 버튼 변경
 * 로그인 안되어있을때
 */
export function Logout(){

  return (
    <div className="logoutlayout">
      <Link className='loginbtn' to="/member/login">로그인</Link>
      <Link className='signupbtn' to="/member/new">회원가입</Link>
    </div>
    
  )
}


/**
 * 로그인 되었을때 헤더 버튼 
 * 
 * 220910 여기해야함
 */
export function Login(props){
  const isLogin = props.isLogin;
  const username = sessionStorage.getItem("id")

  function logoutHandle(){
    axios({
      method: 'post',
      url: '/member/logout',
    }).then((res)=>{
      if(res.data.response === 'success'){
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace('/')
      }
    })
  }
  return (
    <div className="loginlayout">
      {username}님 
      {/*여기를 바꾸면됨 햄버거 메뉴로*/}
      <span className="profile_hoverable">
        <FontAwesomeIcon className="hovericon" icon={faUser} />
        <div className="profile_modal">
          <Link className='mypage' to='/mypage'>마이페이지</Link>
          <br/>
          <Button className='logoutbtn' onClick={logoutHandle}>로그아웃</Button>
        </div>
      </span>
      {/**호버 모달 메뉴 */}

    </div>
  )
}

/**
 * 헤더
 */
export default function Header(){
  const [isLogin,setIsLogin] = useState(false)
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(sessionStorage.getItem('id') === null){
      console.log(isLogin)
      setIsLogin(false)
    }else{
      setIsLogin(true)
    }
  })

  return(
    <Navbar>
      <Container>
      <Navbar.Brand href="/">도사들</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/challenge/list">챌린지</Nav.Link>
      </Nav>
      {isLogin ? 
        <Login isLogin={isLogin}/> : <Logout/>}
      </Container>
    </Navbar>
  )
}
import { Link, Navigate, useNavigate } from "react-router-dom"
import { React, useEffect, useState } from "react"
import axios from "axios"
import { Form, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import './Header.css'

export function Logout(){
  const navigate=useNavigate()
  function onSignupClick(){
    navigate('/member/new')
  }
  function onLoginClick(){
    navigate('/member/login')
  }
  return (
    <div>
      <Button className='loginbtn' onClick={onLoginClick}>로그인</Button>
      <Button className='signupbtn' onClick={onSignupClick}>회원가입</Button>
    </div>
    
  )
}

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
      <Link className='mypage' to='/mypage'>마이페이지</Link>
      <Button className='logoutbtn' onClick={logoutHandle}>로그아웃</Button>
    </div>
  )
}

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
      <Navbar.Brand href="/">Donation Challenge</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">홈</Nav.Link>
        <Nav.Link href="/challenge">챌린지</Nav.Link>
        <Nav.Link>Q&A</Nav.Link>
      </Nav>
      {isLogin ? 
        <Login isLogin={isLogin}/> : <Logout/>}
      </Container>
    </Navbar>
  )
}
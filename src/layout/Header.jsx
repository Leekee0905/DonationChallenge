import { Link, Navigate, useNavigate } from "react-router-dom"
import { React, useEffect, useState } from "react"
import axios from "axios"
import { Form, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"


export function Login(){
  const navigate=useNavigate()
  function onSignupClick(){
    navigate('/member/new')
  }
  function onLoginClick(){
    navigate('/member/login')
  }
  return (
    <Form>
      <Button onClick={onLoginClick}>로그인</Button>
      <Button onClick={onSignupClick}>회원가입</Button>
    </Form>
    
  )
}

export function Logout(props){
  const isLogin = props.isLogin;
  const [userId,setUserId] = useState("")
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
    <div>
      {username}님 
      <Link to='/mypage'>마이페이지</Link>
      <Button onClick={logoutHandle}to='/' replace>로그아웃</Button>
    </div>
  )
}

export default function Header(){
  const [isLogin,setIsLogin] = useState(false)
  
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
        <Nav>Home</Nav>
        <Nav>Features</Nav>
        <Nav>Pricing</Nav>
      </Nav>
      {isLogin ? 
      	// Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
        <Logout isLogin={isLogin}/> : <Login/>}
      </Container>
    </Navbar>
  )
}
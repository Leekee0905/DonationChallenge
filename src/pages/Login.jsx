import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { React, useState } from 'react';
import './Login.css'
export default function Login(){
  const [m_loginId, setId] = useState("");
  const [m_password,setPassword] = useState("");

  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/member/login",
      data: {
        m_loginId : m_loginId,
        m_password: m_password,
        },
      }).then((res)=>{
        if(res.data.response === 'success'){
          alert('로그인되었습니다.')
          window.location.replace('/')
          sessionStorage.setItem("id",m_loginId)
          sessionStorage.setItem("login", "true")
          localStorage.setItem("id",m_loginId)
          localStorage.setItem("login","true")
        }else if(res.data.response === 'id'){
          setIdMessage("아이디가 틀렸습니다.")
        }else if(res.data.response === 'password'){
          setPasswordMessage("비밀번호가 틀렸습니다.")
        }
      })
      .catch((error)=>{
        console.log(error)
      })

  };

  const loginId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
  }

  const loginPassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
  }

  return (
    <Form className='logintype'onSubmit={handleSubmit}>

      <h2>로그인</h2>
      <Form.Group className='mb-3' controlId='formBasicId'>
        <Form.Label>아이디</Form.Label>
        <Form.Control required value={m_loginId} onChange={loginId} type="text" placeholder='아이디를 입력하세요' />
        <Form.Text className='name'>{idMessage}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control required 
          name="password"
          value={m_password}
          onChange={loginPassword} type="password" placeholder="Password" />
        <Form.Text className='password'>
          {passwordMessage}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">로그인</Button>

    </Form>
  );
}
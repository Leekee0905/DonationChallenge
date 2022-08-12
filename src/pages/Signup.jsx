import React, {useState} from 'react'
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {ko} from 'date-fns/esm/locale'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import "./Signup.css"
export default function Signup() {

  const [m_loginId, setId] = useState("");
  const [m_name, setName] = useState("");
  const [m_password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [m_phoneNumber,setPhone] = useState("");
  const [m_birth, setStartDate] = useState(new Date())


  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("중복 확인을 눌러주세요.");
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    if(m_name.length === 0){
      setNameMessage("이름을 한 글자 이상 적어주세요")
    }
  }
  

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (m_password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("일치되었습니다..");
      setIsPasswordConfirm(true);
    }
  };

  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);
  }

  function checkDuplicateId(){
    axios({
      method: "post",
      url: "/member/new/check",
      data: {
        m_loginId : m_loginId,
        },
      }).then(function (res){
        if (res.data.response===0){
          setIdMessage('사용가능한 아이디입니다.')
          setIsId(true)
        } else{
          setIdMessage('중복된 아이디입니다. 다시 설정해주세요.')
          setIsId(false)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  function submitSignup(){
    axios({
      method: "post",
      url: "/member/new",
      data: {
        m_loginId : m_loginId,
        m_name : m_name,
        m_password: m_password,
        m_phoneNumber: m_phoneNumber,
        m_birth: moment(m_birth).format("yyyy-MM-DD"),
        },
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>회원가입</h2><br/>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control required value={m_name} onChange={onChangeName} type="text" placeholder="이름을 입력하세요" />
            <Form.Text className='name'>
              {nameMessage}
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>아이디</Form.Label>
          <Form.Control required value={m_loginId} onChange={onChangeId} type="text" placeholder="아이디를 입력하세요." />
          <Button class='form-inline'id='checkbtn'onClick={checkDuplicateId}>중복확인</Button>
          <Form.Text className='id'>
              {idMessage}
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control required 
            name="password"
            value={m_password}
            onChange={onChangePassword} type="password" placeholder="Password" />
          <Form.Text className='password'>
            {passwordMessage}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordAgain">
          <Form.Label>비밀번호 재확인</Form.Label>
          <Form.Control 
            required
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}type="password" placeholder="비밀번호 재확인" />
          <Form.Text className='password'>
            {passwordConfirmMessage}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>전화번호</Form.Label>
          <Form.Control required value={m_phoneNumber} onChange={onChangePhone} type="text" placeholder="전화번호" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirthday">
          <Form.Label>생년월일</Form.Label>
          <DatePicker
          dateFormat={"yyyy-MM-dd"}
          locale={ko} 
          selected={m_birth}
          onChange={(date) => setStartDate(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          />
        </Form.Group>
        <Button onClick={submitSignup}variant="primary" type="submit">
          제출
        </Button>
      </Form>

    
  );
}


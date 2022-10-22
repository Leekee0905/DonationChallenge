import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {ko} from 'date-fns/esm/locale'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import "./Signup.css"

/**
 * 회원가입
 */
export default function Signup() {

  //회원가입 때 받을 데이터
  const [m_loginId, setId] = useState("");
  const [m_name, setName] = useState("");
  const [m_password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [m_phoneNumber,setPhone] = useState("");
  const [m_email, setEmail] = useState("");
  const [code, setCode] =useState("");
  const [m_birth, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  // 메시지
  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("") 

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

/**
 *  회원가입 제출 및 유효성 검사
 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      method: "post",
      url: "/member/new",
      data: {
        m_loginId : m_loginId,
        m_name : m_name,
        m_password: m_password,
        m_phoneNumber: m_phoneNumber,
        m_email: m_email,
        m_birth: moment(m_birth).format("yyyy-MM-DD"),
        },
      }).then((res)=>{
        if(res.data.response === 'success'){
          alert('회원가입 되었습니다.')
          navigate('/')
        }else{
          alert('빈칸이 있거나 조건을 충족하지 않습니다. 다시 입력해 주십시오.')
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  /**
   * 이메일 유효성 검사 및 입력
   */
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailReg =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(!emailReg.test(currentEmail)){
      setEmailMessage("이메일 형식이 맞지 않습니다.")
      setIsEmail(false)
    }else{
      setEmailMessage("이메일 인증을 진행해주세요.")
      setIsEmail(true)
    }
  }

  /**
   * 이메일 인증 코드 입력 
   */
  const onChangeCode = (e) => {
    const currentCode = e.target.value;
    setCode(currentCode);
  }

/**
 * 아이디 입력 및 유효성검사
 */
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

  /**
   *  이름 입력 
   */
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    if(m_name.length === 0){
      setNameMessage("이름을 한 글자 이상 적어주세요")
    } else{
      setNameMessage("이름을 적었습니다.")
    }
  }
  console.log(m_name)


  /**
   * 패스워드 유효성 검사 및 입력 
   */
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

  /**
   * 패스워드 일치 여부
   */
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (m_password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("일치되었습니다.");
      setIsPasswordConfirm(true);
    }
  };

  /**
  * 전화번호 입력
   */
  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);
  }

  /**
   * 이메일 인증메일 보내기
   * */
  const sendEmail= async(e) =>{
    e.preventDefault();
    await axios({
      method: "post",
      url: "/email/send",
      data: {
        m_email: m_email,
      }
    }).then((res)=>{
      if(res.data.response === 'success'){
        setEmailMessage("이메일을 확인해주세요")
      }
    })
  }
  /**
   * 이메일 인증 코드 보내기 
   */
  const sendCode = async(e) =>{
    e.preventDefault();
    await axios({
      method: "post",
      url: "/email/check",
      data: {
        code: code,
      }
    }).then((res)=>{
      setCodeMessage(res.data.response)
      console.log(res.data.response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  /**
   * 아이디 중복 검사 
   */
  const checkDuplicateId = async(e) => {
    e.preventDefault();
    await axios({
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

  return (
    <div>
      <Container className="bannername">
        회원가입
      </Container>
      <Form className='signtype'onSubmit={handleSubmit}>
        <h2>회원가입</h2><br/>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control required value={m_name} onChange={onChangeName} type="text" placeholder="이름을 입력하세요" />
            <Form.Text className='name'>
              {nameMessage}
            </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control required onChange={onChangeEmail} value={m_email} type="email" placeholder="이메일을 입력하세요" />
          <Form.Text className='email'>{emailMessage}</Form.Text>
        </Form.Group>

        <Button className='sendbtn' onClick={sendEmail}>인증번호보내기</Button>

        <Form.Group className='mb-3' controlId="formBasicCode">
          <Form.Control required onChange={onChangeCode} value={code} type="text" placeholder="인증코드를 입력하세요"/>
          <Form.Text className='code'>{codeMessage}</Form.Text>
        </Form.Group>
        <Button className='codecheck' onClick={sendCode}>인증확인</Button>
        

        <Form.Group className="mb-3" id='id' controlId="formBasicID">
          <Form.Label>아이디</Form.Label>
          <Form.Control required value={m_loginId} onChange={onChangeId} type="text" placeholder="아이디를 입력하세요." />
          <Form.Text className='id'>
            {idMessage}
          </Form.Text>
        </Form.Group>
        
        <Button className='checkbtn'onClick={checkDuplicateId}>중복확인</Button>
        
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
        <Button variant="primary" className='signupsubmit' type="submit">
          제출
        </Button>
      </Form>
    </div>
  );
}


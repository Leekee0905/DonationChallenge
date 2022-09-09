import { Table, Form, Button, Container, Modal} from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";
import './UserInfo.css'
import { useNavigate } from "react-router-dom";

/**
   * 회원탈퇴
   */
export const DeleteMember = () => {
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    const currnetPassword = e.target.value;
    setPassword(currnetPassword);
  }

  const confrimDelete = () => {
    if(window.confirm('정말 탈퇴 하시겠습니까?') === true){
      handleShow()
    }else{
      return false
    }
  }

  const quitMemeber = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/mypage/member/delete',
      data: {
        m_password: password,
      }
    }).then((res)=>{
      if(res.data.response === '성공적으로 탈퇴되었습니다.'){
        alert(res.data.response)
        sessionStorage.clear();
        localStorage.clear();
        navigate('/')
      }else if(res.data.response === '로그인을 해주세요.'){
        alert(res.data.response)
        navigate('/member/login')
      } else{
        alert(res.data.response)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  return(
    <div>
      <Button variant="primary" onClick={confrimDelete}>
      회원탈퇴
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                onChange={onChangePassword}
                value={password}
                type="password"
                placeholder="비밀번호"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={quitMemeber}>
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

/**
 *  이메일 업데이트 팝업창 
 */
export const EmailCheck = (props) => {
  const [code, setCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const m_email = props.email
  const onChangeCode = (e) => {
    const currentCode = e.target.value;
    setCode(currentCode)
  }

  /** 이메일 인증 코드 보내기 */
  const sendCode = async(e) =>{
    e.preventDefault();
    await axios({
      method: "post",
      url: "/mypage/update/email/check",
      data: {
        code: code,
        m_email: m_email
      }
    }).then((res)=>{
      if(res.data.response === '성공적으로 변경되었습니다'){
        alert(res.data.response)
        props.onHide();
        window.location.replace('/mypage')
      }else{
        setCodeMessage(res.data.response)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }


  return(
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        이메일 인증
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className='mb-3' controlId="formBasicCode">
          <Form.Control required onChange={onChangeCode} value={code} type="text" placeholder="인증코드를 입력하세요"/>
          <Form.Text className='code'>{codeMessage}</Form.Text>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>닫기</Button>
      <Button onClick={sendCode}>인증하기</Button>
    </Modal.Footer>
  </Modal>
  )
}



export default function UserInfo(){
  const navigate = useNavigate();

  const [mydata, setMydata] = useState("");
  const [m_oldpassword, setOldPassword] = useState("");
  const [m_newpassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [m_newemail, setNewEmail] = useState("");
  const [m_phoneNumber, setPhoneNumber] = useState("");
  

  const [emailMessage, setEmailMessage] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  //현재 비밀번호 받기
  const onChangeOldPassword = (e) => {
    const currentOldPassword = e.target.value;
    setOldPassword(currentOldPassword);
  };

  //새 비밀번호 받기
  const onChangeNewPassword = (e) => {
    const currentNewPassword = e.target.value;
    setNewPassword(currentNewPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentNewPassword)) {
      setNewPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setNewPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  //새 비밀번호 일치 여부
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setCheckPassword(currentPasswordConfirm);
    if (m_newpassword !== currentPasswordConfirm) {
      setConfirmPasswordMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setConfirmPasswordMessage("일치되었습니다.");
      setIsPasswordConfirm(true);
    }
  };

  //바꿀 이메일 받기
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setNewEmail(currentEmail);
    const emailReg =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!emailReg.test(currentEmail)){
      setEmailMessage("이메일 형식이 맞지 않습니다.")
      setIsEmail(false);
    }else{
      setEmailMessage("이메일 인증을 진행해주세요.")
      setIsEmail(true)
    }
  }

  //새 전화번호 받기
  const onChangePhoneNumber = (e) => {
    const currentPhone = e.target.value;
    setPhoneNumber(currentPhone);
  }

  //전화번호 업데이트
  const phoneNumberSubmit = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/mypage/update/phone',
      data: {
        m_phoneNumber: m_phoneNumber
      }
    }).then((res)=>{
      if(res.data.response === '성공적으로 변경되었습니다'){
        alert(res.data.response)
        window.location.replace('/mypage')
      }else{
        setNumberMessage(res.data.response)
      }
    })
  }

  //비밀번호 업데이트
  const passwordSubmit = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/mypage/update/password',
      data: {
        m_oldpassword: m_oldpassword,
        m_newpassword: m_newpassword
      }
    }).then((res)=>{
      if(res.data.response==='성공적으로 변경되었습니다'){
        alert(res.data.response)
        navigate('/')
        sessionStorage.clear()
        localStorage.clear()
        alert('다시 로그인 해주세요')
      }
    })
  }

  const emailSubmit = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/mypage/update/email',
      data:{
        m_email: m_newemail,
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  //유저 정보 받아오기
  const getData = async() =>{
    await axios({
      method: 'get',
      url: '/mypage'
    }).then((res)=>{
      setMydata(res.data)
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getData();
  },[])

  return(
    <div>
      <Container className="userinfo">
        회원정보
        <Table>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{mydata.m_loginId}</td>
          </tr>
          <tr>
            <td>생일</td>
            <td>{mydata.m_birth}</td>
          </tr>
        </tbody>
        </Table>
      </Container>
      
      <Container className="phoneNumber_update">
        <Form onSubmit={phoneNumberSubmit}>
          <Form.Group>
            <Form.Label>전화 번호</Form.Label>
            <Form.Control 
            value={m_phoneNumber}
            onChange={onChangePhoneNumber}
            className="numberControl"
            type="text"
            placeholder={mydata.m_phoneNumber}
            />
            <Form.Text className='emailmessage'>
              {numberMessage}
            </Form.Text>
            
          </Form.Group>
          <Button className="numberUpdate" variant="primary" type="submit">변경</Button>
        </Form>
      </Container>

      <Container className="email_update">
        <Form onSubmit={emailSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control 
            value={m_newemail}
            onChange={onChangeEmail}
            required type="email" placeholder={mydata.m_email} />
            <Form.Text className='emailmessage'>
              {emailMessage}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" disabled={!isEmail} onClick={()=>setModalShow(true)} type='submit'>인증하기</Button>
          <EmailCheck show={modalShow} onHide={()=>setModalShow(false)} email={m_newemail} />
        </Form>
      </Container>

      <Container className="password_update">
        <Form onSubmit={passwordSubmit}>
          <Form.Label>비밀번호</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control 
            value={m_oldpassword}
            onChange={onChangeOldPassword}
            required type="password" placeholder="현재 비밀번호" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNewPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control 
            value={m_newpassword}
            onChange={onChangeNewPassword}
            required type="password" placeholder="새 비밀번호" />
            <Form.Text className='password'>
              {newPasswordMessage}
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicNewCheckPassword">
            <Form.Label>새 비밀번호 확인</Form.Label>
            <Form.Control required value={checkPassword} onChange={onChangePasswordConfirm} type="password" placeholder="새 비밀번호 확인" />
            <Form.Text className='password'>
              {confirmPasswordMessage}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type='submit'>변경하기</Button>
        </Form>
      </Container>
      <DeleteMember/>
    </div>
  )
}
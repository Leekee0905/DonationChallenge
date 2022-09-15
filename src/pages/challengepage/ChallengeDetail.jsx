import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReplyList from '../../components/ReplyList';
import './ChallengeDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // ♥︎

/**
 * 수정하기, 삭제하기 버튼 함수
 * 챌린지 id확인하여 본인이 만든 챌린지면 수정, 삭제 버튼 생성
 */
export const Deluptbtn= () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDetail, setUpdateDetail] = useState("")

  /**
   * 삭제 버튼 구현
   */
  const deleteChallenge = async(e) => {
    e.preventDefault();
    if(window.confirm('정말 삭제하시겠습니까?') === true){
      await axios({
        method: 'post',
        url: `/challenge/${id}/delete`
      }).then((res)=>{
        if(res.data.response === 'success'){
          alert('삭제되었습니다.')
          navigate('/challenge/list')
        }else{
          alert(res.data.response)
        }
      }).catch(error=>{
        console.log(error)
      })
    }else{
      return false
    }
  }

  const onChangeTitle = (e) => {
    const currentTitle = e.target.value;
    setUpdateTitle(currentTitle);
  }

  const onChangeDetail = (e) => {
    const currentDetail = e.target.value;
    setUpdateDetail(currentDetail);
  }

  /**
   * 수정하기 구현 onChange로 받은 value들을 post를 통해 서버에 업데이트 
   */
  const updateChallenge = async(e) =>{
    e.preventDefault();
    await axios({
      method: 'post',
      url: `/challenge/${id}/update`,
      data: {
        c_title : updateTitle,
        c_detail: updateDetail,
      }
    }).then((res) => {
      alert(res.data.response)
      if(res.data.response === '성공적으로 변경되었습니다.'){
        setShow(false)
        navigate(`/challenge/${id}`)
      }
    })
  }

  return(
  <div>
    <Button className="delbtn" onClick={deleteChallenge} varinat='primary'>삭제</Button>
    <Button className='uptbtn' onClick={handleShow} variant="primary">수정</Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>챌린지 수정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>챌린지 제목</Form.Label>
              <Form.Control
                onChange={onChangeTitle}
                value={updateTitle}
                type="title"
                placeholder="챌린지 제목"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>챌린지 내용</Form.Label>
              <Form.Control onChange={onChangeDetail} value={updateDetail} as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button className="submit-update" variant="primary" onClick={updateChallenge}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
  </div>)
}


export const Certification = (props) => {
  const params = useParams();
  const id = params.id;

  const [file, setFile] = useState();
  const [reply, setReply] = useState({
    r_detail: ''
  });
  
  const onChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const onChangeReply= (e)=> {
    const currentReply = e.target.value;
    setReply({['r_detail']: currentReply});
  }
  


  const blob = new Blob([JSON.stringify(reply)], {type: 'application/json'})

  const onSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('replyReq',blob);
    console.log(formData)
    await axios({
      method: 'post',
      url: `/challenge/${id}/reply`,
      headers:{
        'Content-Type': "multipart/form-data",
      },
      data: formData,
    }).then((res)=>{
      console.log(formData)
      if(res.data.response === '댓글달기 완료'){
        window.location.replace(`/challenge/${id}`)
      }
    })
  }

  
  return(
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control 
        value={reply.r_detail}
        required
        onChange={onChangeReply}
        placeholder="당신의 챌린지를 설명해주세요."
        className="replycontrol"
        type="text"/>
        <Form.Control         
        onChange={onChangeFile}
        required
        className="filecontrol"
        type="file" />
        <div className="submitbtn">
        <Button className='submitreply' disabled={!props.state} variant="primary" type="submit">제출</Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export const Payment = (props) => {
  const params = useParams();
  const id = params.id;
  const {
    m_name,
    m_phoneNumber,
    m_email,
  }=props.data
  console.log(props)
  const [price, setPrice] = useState("");
  const onChangePrice = (e) => {
    const currentPrice = e.target.value;
    setPrice(currentPrice);
  }

  const onClickPayment = () => {
    const {IMP} = window
    IMP.init('imp31260025')
    console.log(props.c_title)
    const data={
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid${new Date().getTime()}`,
      amount: price,
      name: props.title,
      buyer_name: m_name,
      buyer_tel: m_phoneNumber,                     // 구매자 전화번호
      buyer_email: m_email,               // 구매자 이메일
    };

    IMP.request_pay(data, callback);
  }

  const callback = (response) => {
    const {
      success,
      imp_uid,
      merchant_uid,
      error_msg,
    } = response;

    if(success){
      axios({
        method: 'post',
        url: `/verifyIamport/`+`${imp_uid}`,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          imp_uid: imp_uid,
          merchant_uid: merchant_uid
        }
      })
      .then((res)=>{
      if(response.paid_amount === res.data.response.amount){
        alert('결제가 완료되었습니다.')
        axios({
          method: 'post',
          url: `/challenge/${id}/payment`,
          data:{
            p_price: price,
            imp_uid: response.imp_uid
          }
        }).then(()=>{
        }).catch((error)=>{
          console.log(error);
        })
      }else {
        alert(`결제 실패: ${error_msg}`)
      }
    })  
    }else {
      alert(`${error_msg}`)
    }
  }

  return(
    <Form>
      <Form.Control
      value={price}
      onChange={onChangePrice}
      required
      placeholder={'기부 금액'}
      min={100}
      className="pricecontrol"
      type="number"/>
      <Form.Text>기부는 선택입니다. 최소 금액 100원</Form.Text>
      <div>
      <Button className="paybtn" disabled={!props.state} onClick={onClickPayment} type="button" >결제하기</Button>
      </div>
  </Form>
  )
}


export default function ChallengeDetail(){

  const navigate = useNavigate()
  const params = useParams();
  const id = params.id;

  const [whomade,setWhoMade] = useState();
  const [whosname,setWhosName] = useState();
  const [replyList, setReplyList] = useState();

  const [c_detail, setDetail] = useState("");
  const [c_title, setTitle] = useState("");
  const [c_donation_destination, setDonation] = useState("");
  const [c_hearts, setHearts] = useState();
  const [c_price, setPrice] = useState();
  const [c_challengers, setChallengers] = useState();
  const [c_state, setState] = useState("");
  const [c_startTime, setStartTime] = useState("");
  const [c_endTime, setEndTime] = useState("");

  const [finishMessage, setFinishMessage] = useState("");

  const [myData, setMyData] = useState("");

  const [isMade, setIsMade] = useState(false);
  const [isParticipate, setIsParticipate] = useState(false)
  const [isState, setIsState] = useState(true);


  /**
   * 변경사항이 있을 때 마다 데이터를 다시 받아오기 위해 useEffect사용해서 axios로 데이터 주고받음
   * get 두 개다 챌린지 정보를 가져옴
   * member에서 받아오는 것은 챌린지 생성자의 정보
   * id에서 받아오는 것은 챌린지 정보
   * 
   * reply 댓글(챌린지 인증) 정보
   * 
   * post equal은 로그인한 유저가 챌린지 만든 생성자인지 확인
   * participant는 챌린지에 참여한 사람인지 확인
   */
  useEffect(()=>{
    axios.get(`/challenge/${id}/member`)
    .then((res)=>{
      setWhoMade(res.data.m_loginId)
      setWhosName(res.data.m_name)
    })
    axios.get(`/challenge/${id}`)
    .then((res)=>{
      setTitle(res.data.c_title)
      setDetail(res.data.c_detail)
      setDonation(res.data.c_donation_destination)
      setHearts(res.data.c_hearts)
      setChallengers(res.data.c_challengers)
      setPrice(res.data.c_price)
      if(res.data.c_state === 'PROCEED'){
        setState('진행중')
        setIsState(true)
      }else if(res.data.c_state === 'END'){
        setState('종료')
        setIsState(false)
        setFinishMessage('종료된 챌린지입니다. 더이상 인증하거나 기부를 할 수 없습니다.')
      }
      setStartTime(res.data.c_startTime)
      setEndTime(res.data.c_endTime)
    })
    .catch((error)=>{
      console.log(error)
    })

    axios.get(`/challenge/${id}/replyList`)
    .then((res)=>{
      setReplyList(res.data)
    }).catch((error)=>{
      console.log(error)
    })

    axios.post(`/challenge/${id}/equal`)
    .then((res)=>{
      if(res.data.response === 1){
        setIsMade(true)
      }else{
        setIsMade(false)
      }
    })
    .catch((error)=>{
      console.log(error)
    })

    axios({
      method: 'post',
      url: `/challenge/${id}/participant`,
      challenge_id: id,
    }).then((res)=>{
      if(res.data.response === 1){
        setIsParticipate(true)
      }else{
        setIsParticipate(false)
      }
    })
    .catch(error=>{
      console.log(error)
    })

    axios.get('/mypage')
    .then((res)=>{
      setMyData(res.data)
    })
  },[])

  /**
   * 챌린지 참가 버튼 클릭이벤트 
   */
  const applyChallenge = async(e) => {
    e.preventDefault();
    if(c_state === '진행중'){
      await axios({
        method: 'post',
        url: '/challenge/participate',
        data:{
          challenge_id : id
        }
      }).then((res)=>{
        if(res.data.response === 'success'){
          alert('챌린지에 참가하였습니다.')
          window.location.replace(`/challenge/${id}`)
        }else{
          alert(res.data.response)
          navigate('/member/login')
        }
      })
    }else{
      alert('이미 종료된 챌린지입니다. 참가할 수 없습니다.')
    }

  }

  return(
    <div>
      <div className="bannername">
        챌린지
      </div>
      <Container>
        <div className="infoBox">
          <h1 className="title">{c_title}</h1><br/>
          <FontAwesomeIcon className="recommend-heart" icon={solidHeart}/>{c_hearts}
        </div>
        <div className="info_detail">
          {c_detail}
        </div>
        <div className="whomadebox">
          <div className="whomade">
            {whomade}
          </div>
          <span className="dubtn">
            {isMade ? <Deluptbtn />: ''}
          </span>
        </div>
        <div className="detailbox">
          <Row md={12}>
            <Col md={4}>
            <div className="challenge_detail">
              <div className="detail_item">
                현재 모금액: {c_price}원
              </div>
              <div className="detail_item">
                도사들 : {c_challengers}명
              </div>
              <div className="detail_item">
                기부처 : {c_donation_destination}
              </div>
              <div className="detail_item">
                기간 : {c_startTime} ~ {c_endTime}
              </div>
            </div>
            </Col>
            <Col md={8}>
              <div className="submitbox">
                {isParticipate ? <Certification state={isState}></Certification> : ''}
                {isParticipate ? <Payment state={isState} title={c_title} data={myData}/> : ''}
              </div>

            </Col>
          </Row>

        </div>
          <h4 className="finishmessage">{finishMessage}</h4>
        {isParticipate ? '' : <Button onClick={applyChallenge} className="applybtn">챌린지 신청하기</Button>}
        <div className="replylist">
          인증 내역
        </div>
        <Container className="replycontainer" fluid='md'>
          <Row lg={3} md={2} xs={1}>
              {replyList ? replyList.map(list=>{
                return(
                  <Col key={list.id}>
                    <ReplyList id={id} list={list} />
                  </Col>
                )
              }): ''}
          </Row> 
        </Container>
      </Container>
    </div>
  )
}


import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './ChallengeDetail.css'

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
          navigate('/challenge')
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
    <Button className="delbtn" onClick={deleteChallenge} varinat='primary'>챌린지삭제</Button>
    <Button className='uptbtn' onClick={handleShow} variant="primary">수정하기</Button>

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
          <Button variant="primary" onClick={updateChallenge}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
  </div>)
}

export default function ChallengeDetail(){

  const navigate = useNavigate()
  const params = useParams();
  const id = params.id;
  const [whomade,setWhoMade] = useState();
  const [whosname,setWhosName] = useState();
  const [c_detail, setDetail] = useState("");
  const [c_title, setTitle] = useState("");
  const [c_donation_destination, setDonation] = useState("");
  const [c_recommendation, setRecommendation] = useState();
  const [c_price, setPrice] = useState();
  const [c_challengers, setChallengers] = useState()
  const [c_state, setState] = useState("")
  const [c_startTime, setStartTime] = useState("")
  const [c_endTime, setEndTime] = useState("")
  const [isMade, setIsMade] = useState(false);
  const [isParticipate, setIsParticipate] = useState(false)


  /**
   * 변경사항이 있을 때 마다 데이터를 다시 받아오기 위해 useEffect사용해서 axios로 데이터 주고받음
   * get 두 개다 챌린지 정보를 가져옴
   * member에서 받아오는 것은 챌린지 생성자의 정보
   * id에서 받아오는 것은 챌린지 정보
   */
  useEffect(()=>{
    axios.get(`/challenge/${id}/member`)
    .then((res)=>{
      setWhoMade(res.data.m_loginId)
      setWhosName(res.data.m_name)
    })
    axios.get(`/challenge/${id}`)
    .then((res)=>{
      console.log(res.data)
      setTitle(res.data.c_title)
      setDetail(res.data.c_detail)
      setDonation(res.data.c_donation_destination)
      setRecommendation(res.data.c_recommendation)
      setChallengers(res.data.c_challengers)
      setPrice(res.data.c_price)
      if(res.data.c_state === 'PROCEED'){
        setState('진행중')
      }
      setStartTime(res.data.c_startTime)
      setEndTime(res.data.c_endTime)
    })
    .catch((error)=>{
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
      console.log(res)
      if(res.data.response === 1){
        setIsParticipate(true)
      }else{
        setIsParticipate(false)
      }
    })
    .catch(error=>{
      console.log(error)
    })
  })

  /**
   * 챌린지 참가 버튼 클릭이벤트 
   */
  const applyChallenge = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/challenge/participate',
      data:{
        challenge_id : id
      }
    }).then((res)=>{
      if(res.data.response === 'success'){
        alert('챌린지에 참가하였습니다.')
        navigate(`/challenge/${id}`)
      }else{
        alert(res.data.response)
        navigate('/member/login')
      }
    })
  }

  return(
    <Container>
      <div className="infoBox">
        <h1 className="title">{c_title}</h1>
        <span className="info">
          챌린지 생성자 : {whomade}님  
          <div>
            참여 인원 : {c_challengers}명
          </div>
          <div>
            기간 : {c_startTime} ~ {c_endTime}
          </div>
          <div>
            추천 수 : {c_recommendation}회
          </div>
        </span>
        <span className="info2">
          <div>
              기부 단체 : {c_donation_destination}
            </div>
            <div>
              챌린지 기부 금액 : {c_price}원
            </div>
            <div>
              진행 상황 : {c_state}
            </div>
        </span>
        <span className="dubtn">
          {isMade ? <Deluptbtn />: ''}
        </span>
      </div>
      {isParticipate ? <Button>댓글달기</Button>:<Button onClick={applyChallenge} className="applybtn">챌린지 신청하기</Button>}
      
      <h3>{c_detail}</h3>
      
      
    </Container>
  )
}


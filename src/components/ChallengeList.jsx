import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './ChallengeList.css'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // ♡
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // ♥︎
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChallengeList(props){
  const navigate = useNavigate();
  const [like, setLike] = useState("");
  const [isLike, setIsLike] = useState("");
  const [hearts, setHearts] = useState("");
  const [path, setPath] = useState("");
  const [newstate, setNewState] = useState("");
  /**
   * props로 Challenge.jsx에서 챌린지 데이터 받아와서 출력
   */
  const {id, 
    c_title,
    c_detail,
    c_donation_destination,
    c_startTime, 
    c_endTime, 
    c_price, 
    c_state,
    c_challengers} = props.list


/**
 * 챌린지 세부페이지로 이동
 */
  const navigateDetail=()=>{
    navigate(`/challenge/${id}`)
  }

  const postRecommend = async(e) => {
    e.stopPropagation()
    if(isLike === false){
      setLike("1")
      setIsLike(true)
    }else{
      setLike('0')
      setIsLike(false)
    }

    await axios({
      method: 'post',
      url: `/challenge/${id}/heart`,
      data: {
        like: like
      }
    }).then((res)=>{
      if(res.data.response === '로그인을 다시 해야합니다.'){
        alert(res.data.response)
        navigate('/member/login')
      }
      console.log(res.data.response)
      setHearts(res.data.response)
    })
  }

  useEffect(()=>{
    
    axios({
      method: 'get',
      url: `/challenge/${id}/heart`
    }).then((res)=>{
      setHearts(res.data.hearts)
      if(res.data.response === "1"){
        setLike("1")
        setIsLike(true)
      }else{
        setLike("0")
        setIsLike(false)
      }
    })
    cardThumbnail();
    changeState();

  })

  
  const cardThumbnail = () => {
    if(c_donation_destination === '굿네이버스'){
      setPath(process.env.PUBLIC_URL+"/img/good.png")
    }else if(c_donation_destination === '초록우산어린이재단'){
      setPath(process.env.PUBLIC_URL+"/img/green.png")
    }else if(c_donation_destination === '적십자'){
      setPath(process.env.PUBLIC_URL+"/img/redcross.png")
    }else if(c_donation_destination === '유니세프'){
      setPath(process.env.PUBLIC_URL+"/img/unicef.png")
    }
  }

  const changeState = () => {
    if(c_state === 'PROCEED'){
      setNewState('진행중')
    }else{
      setNewState('종료')
    }
  }


  return(
    <Card style={{height:"13rem"}}className="challengecard" onClick={navigateDetail} >
      <Card.Img style={{height:"44px"}} variant="top" src={path}/>
      <Card.Body>
        <Card.Title>{c_title}</Card.Title>
        <div className="card_detail">{c_donation_destination}</div>
        <div className="card_detail">~ {c_endTime}</div>
        <div>
          <FontAwesomeIcon onClick={postRecommend} className="recommend" icon={isLike ? solidHeart : regularHeart}/>
            {hearts}
          </div>
      </Card.Body>
    </Card>
  )
}
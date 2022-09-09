import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, ListGroup } from "react-bootstrap";
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
      console.log(like)
      setIsLike(true)
    }else{
      setLike('0')
      console.log(like)
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
      console.log(res.data.response)
      setHearts(res.data.hearts)
      if(res.data.response === "1"){
        setLike("1")
        setIsLike(true)
      }else{
        setLike("0")
        setIsLike(false)
      }
    })
  },[])


  return(
    <Card className="challengecard" onClick={navigateDetail} >
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{c_title}</Card.Title>
        <Card.Text>
          {c_detail.substr(0,21)}
        </Card.Text>
      </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{hearts}회</ListGroup.Item>
          <ListGroup.Item>{c_price}원</ListGroup.Item>
          <ListGroup.Item>{c_donation_destination}</ListGroup.Item>
          <ListGroup.Item>{c_startTime} ~ {c_endTime}</ListGroup.Item>
          <ListGroup.Item>{c_state}</ListGroup.Item>
          <ListGroup.Item>{c_challengers}명</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <FontAwesomeIcon onClick={postRecommend} className="recommend" icon={isLike ? solidHeart : regularHeart}/>

          
        </Card.Body>
      
    </Card>
  )
}
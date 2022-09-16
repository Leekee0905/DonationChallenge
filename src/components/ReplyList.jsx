import { Card,Button, Row, Col } from "react-bootstrap";
import './ReplyList.css'
import ReactPlayer from "react-player";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function ReplyList(props){

  const [isMade, setIsMade] = useState(false);

  const {
    id,
    r_detail,
    r_fileName,
    r_member
  } =props.list

  const detail_id = props.id

  useEffect(()=>{
    if(r_member === sessionStorage.getItem("id")){
      setIsMade(true)
    }
  })

  const onClickDeleteReply = async() => {
    if(window.confirm('정말 삭제하시겠습니까?') === true){
    await axios.post(`/delete/reply/${id}`)
    .then((res)=>{
      if(res.data.response === '성공적으로 삭제되었습니다.'){
        alert(res.data.response)
        window.location.replace(`/challenge/${detail_id}`)
      }else{
        alert(res.data.response)
      }
    })
    }else 
    return false
  }
  
  return (
    <Card className="reply-card" style={{width:"100%", height:'240px'}}>
      <Row lg={12} md={12} sm={12}>
        <Col lg={6} md={6} sm={6}>
          <ReactPlayer 
          className="reply-video"
          url={process.env.PUBLIC_URL + `/video/${r_fileName}`}
          width='100%'
          height='240px'
          controls
          light={false}
          playsinline
          />
        </Col>
        <Col lg={6} md={6} sm={6}>
          <div className="replybody">
            <Card.Text className="replyname">{r_member}님</Card.Text>
            <Card.Text className="replydetail">{r_detail}</Card.Text>
          </div>
          {isMade ? <Button className="deletereply" onClick={onClickDeleteReply}>삭제</Button>:''}
        </Col>
      </Row>
    </Card>
  )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './ChallengeList.css'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


export default function ChallengeList(props){
  const navigate = useNavigate();
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
  c_recommnedataion,
  c_state,
  c_challengers} = props.list

/**
 * 챌린지 세부페이지로 이동
 */
  const navigateDetail=()=>{
    navigate(`/challenge/${id}`)
  }


  return(
    <Card className="challengecard" onClick={navigateDetail}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{c_title}</Card.Title>
        <Card.Text>
          {c_detail.substr(0,21)}
        </Card.Text>
      </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{c_recommnedataion}회</ListGroup.Item>
          <ListGroup.Item>{c_price}원</ListGroup.Item>
          <ListGroup.Item>{c_donation_destination}</ListGroup.Item>
          <ListGroup.Item>{c_startTime} ~ {c_endTime}</ListGroup.Item>
          <ListGroup.Item>{c_state}</ListGroup.Item>
          <ListGroup.Item>{c_challengers}명</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <FontAwesomeIcon icon={faThumbsUp}/>
          <Button className="recommend">추천</Button>
        </Card.Body>
      
    </Card>
  )
}
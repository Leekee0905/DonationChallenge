import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ChallengeList(props){
  const navigate = useNavigate();
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

  function navigateDetail(){
    navigate(`/challenge/${id}`)
  }

  return(
    <Card style={{width: '18rem'}}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{c_title}</Card.Title>
        <Card.Text>
          {c_detail}
        </Card.Text>
        <Card.Text>{c_recommnedataion}</Card.Text>
        <Card.Text>{c_price}원</Card.Text>
        <Card.Text>{c_donation_destination}</Card.Text>
        <Card.Text>
          {c_startTime} ~ {c_endTime}
        </Card.Text>
        <Card.Text>{c_state} {c_challengers}명</Card.Text>
        <Button onClick={navigateDetail} variant="primary">챌린지 신청하기</Button>
      </Card.Body>

    </Card>
  )
}
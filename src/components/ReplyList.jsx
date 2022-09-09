import { Card } from "react-bootstrap";
import './ReplyList.css'
import ReactPlayer from "react-player";
export default function CertificationList(props){

  const {
    id,
    r_detail,
    r_fileName,
    r_member
  } =props.list

  console.log(props)
  
  return (
    <Card>
      <Card.Title>{r_member}</Card.Title>
      <Card.Body className="replybody">
        <Card.Title>{r_detail}</Card.Title>
        <ReactPlayer 
        className="reply-video"
        url={process.env.PUBLIC_URL + `/video/${r_fileName}`}
        width='250px'
        height='300px'
        controls
        light={false}
        playsinline
        />
      </Card.Body>
    </Card>
  )
}
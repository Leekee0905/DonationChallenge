import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

export default function MyReplyList(){

  const [replyData, setReplyData] = useState();

  useEffect(()=>{
    axios.get('/mypage/challenges/reply')
    .then((res)=>{
      setReplyData(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return(
    <Container>

      <Table striped>
        <thead>
          <tr>
            <th>댓글 단 챌린지</th>
            <th>내용</th>
            <th>시간</th>
            <th>기부처</th>
          </tr>
        </thead>
        <tbody>
        {
          replyData ? replyData.map(list=>{
            console.log(list)
            return(
              <tr>
                <td>{list.r_title}</td>
                <td>{list.r_detail}</td>
                <td>{list.r_localDateTime}</td>
                <td>{list.r_donation_destination}</td>
              </tr>
            )
        }):''
        }
        </tbody>
      </Table>
    </Container>
  )
}
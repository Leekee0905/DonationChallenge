import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './MyPayment.css'

export default function MyPayment(){
  const [paylist, setPayList] = useState(); 
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get('/mypage/challenges/payment')
    .then((res)=>{
      setPayList(res.data)
      console.log(res.data)
    })
  },[])

  return(
    <Container>
      <Table>
        <thead>
          <tr>
            <th>챌린지 명</th>
            <th>기부 날짜</th>
            <th>기부 금액</th>
          </tr>
        </thead>
        <tbody>
          {
            paylist ? paylist.map(list=>{
              return(
                <tr className="paidchallenge" key={list.p_trash} onClick={()=>{navigate(`/challenge/${list.p_challengeId}`)}}>
                  <td>{list.p_challengeName}</td>
                  <td>{list.p_paymentDate}</td>
                  <td>{list.p_price}원</td>
                </tr>
              )
            }):''
          }
        </tbody>
      </Table>
    </Container>
  )
}
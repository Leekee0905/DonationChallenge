import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ChallengeDetail(props){

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [thisChallenge, setThisChallenge] = useState();
  const [whomade,setWhoMade] = useState();
  const [whosname,setWhosName] = useState(); 

  function deleteChallenge(){
    axios({
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
  }

  useEffect(()=>{
    axios.get(`/challenge/${id}`)
    .then((res)=>{
      setWhoMade(res.data.m_loginId)
      setWhosName(res.data.m_name)
    })
  })


  console.log(params)
  return(
    <div>챌린지 세부페이지<br />
      {whomade}<br/>
      {whosname}
      <Button onClick={deleteChallenge} varinat='primary'>챌린지삭제</Button>
    </div>
  )
}
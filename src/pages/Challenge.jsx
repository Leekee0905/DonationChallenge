import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import ChallengeList from '../components/ChallengeList'
import './Challenge.css'


export default function Challenge(){
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  function toUpload(){
    if(sessionStorage.getItem === 'null'){
      navigate('/member/login')
    } else {
      navigate('/challenge/upload')
    }
  }

  useEffect(()=>{
    axios({
      method: 'get',
      url: '/challenge/list'
    })
    .then((res)=>{
      console.log(typeof(res.data))
      setChallenges(res.data)
    })
  },[])


  return(<div>
    <h2>챌린지 페이지입니다.</h2>
    {challenges ? challenges.map(list=>{
      console.log(list)
      return(
        <ChallengeList list={list} key={list.id}/>
      )
    }): ''}
    <Button className="uploadbtn" onClick={toUpload}>업로드</Button>
  </div>)
}
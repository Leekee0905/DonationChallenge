import {Form, Button, Container} from "react-bootstrap"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import { useState } from 'react';
import subDays from 'date-fns/subDays';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChallengeUpload.css'

/**
 * 챌린지 업로드 양식
 */
export default function ChallengeUpload(){
  const [c_title, setTitle] = useState("")
  const [c_detail, setDetail] = useState("")
  const [c_donation_destination, setDonation] = useState("")
  const [c_endTime, setEndTime] = useState(new Date());
  const navigate = useNavigate()
  console.log(c_donation_destination)
  
  const onChangeTitle = (e) =>{
    const currentTitle = e.target.value;
    setTitle(currentTitle)
  }

  const onChangeDetail = (e) => {
    const currentDetail = e.target.value;
    setDetail(currentDetail);
  }

  const onChangeDonation = (e) => {
    const currentDonation = e.target.value;
    setDonation(currentDonation);
  }

  /**
   * 챌린지 생성 제출 클릭 이벤트
   */
  const submitChallenge = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/challenge/new',
      data: {
        c_title: c_title,
        c_detail: c_detail,
        c_donation_destination: c_donation_destination,
        c_endTime: moment(c_endTime).format("yyyy-MM-DD"),
      }
    }).then((res)=>{
      if(res.data.response === 'success'){
        alert('챌린지가 생성되었습니다.')
        navigate('/challenge/list')
      }else{
        alert(res.data.response)
        if(res.data.response === '로그인을 해주세요'){
          navigate('/member/login')
        }
      }
    })
  }
  return (
    <div>
      <Container className="bannername">
        챌린지 업로드
      </Container>
      <Form className='uploadtype'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>챌린지 제목</Form.Label>
          <Form.Control onChange={onChangeTitle} value={c_title} type="title" placeholder="챌린지 제목을 입력하세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>챌린지 설명란</Form.Label>
          <Form.Control onChange={onChangeDetail} value={c_detail} as="textarea" rows={3} />
        </Form.Group>
        <Form.Select onChange={onChangeDonation} value={c_donation_destination} aria-label="Default select example">
          <option>기부단체 선택</option>
          <option value="적십자">적십자</option>
          <option value="초록우산어린이재단">초록우산어린이재단</option>
          <option value="굿네이버스">굿네이버스</option>
          <option value="유니세프">유니세프</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicEndDay">
            <Form.Label>종료 날짜</Form.Label>
            <DatePicker
            calendarStartDay={3}
            minDate={subDays(new Date(),0)}
            dateFormat={"yyyy-MM-dd"}
            locale={ko} 
            selected={c_endTime}
            onChange={(date) => setEndTime(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            />
          </Form.Group>
        <Button className="c_upload_btn" onClick={submitChallenge}>업로드</Button>
      </Form>
    </div>
  );
}

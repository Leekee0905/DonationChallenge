import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div>
      <h2>홈입니다.</h2>
      <Link to='Signup'>회원가입</Link>
    </div>
  )
}
import { Container } from 'react-bootstrap'
import './Footer.css'
export default function Footer(){
  return (
    <footer className='footer'>
      <div className='footer_wrapper'>
        <div className='footer_front'>
          <div className='name'>이기성</div>
          <div className='email'>cj8928@gmail.com</div>
        </div>

        <div className='footer_back'>
          <div className='name'>양철진</div>
          <div className='email'>gra1259@naver.com</div>
        </div>
      </div>
    </footer>
  )
}
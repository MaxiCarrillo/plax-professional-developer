import { Link } from 'react-router-dom';
import './Footer.css';
import Isologo from '../../../../assets/images/Isologotipo.png'

export const Footer = () => {
    return (
        <footer className='footer'>
            <Link href="">
                <figure className='footer__isologo'>
                    <img src={Isologo} height={40} width={40} alt="Hotel" />
                    <figcaption>&copy; 2024 PLAX</figcaption>
                </figure>
            </Link>
            <a href="https://www.linkedin.com/in/maximiliano-joaquin-carrillo/" target="_blank" rel="noopener noreferrer">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_67_26)">
                        <path d="M27.2654 27.266H22.5241V19.8406C22.5241 18.07 22.4924 15.7906 20.0581 15.7906C17.5886 15.7906 17.2107 17.7198 17.2107 19.7117V27.2655H12.4694V11.996H17.0211V14.0827H17.0848C17.5403 13.3038 18.1986 12.6631 18.9894 12.2287C19.7803 11.7944 20.6741 11.5826 21.5758 11.6161C26.3814 11.6161 27.2674 14.7771 27.2674 18.8893L27.2654 27.266ZM7.11944 9.90883C5.59981 9.90908 4.36769 8.67733 4.36744 7.1577C4.36719 5.63808 5.59881 4.40595 7.11844 4.4057C8.63806 4.40533 9.87019 5.63708 9.87044 7.1567C9.87057 7.88646 9.58081 8.58638 9.0649 9.1025C8.549 9.61862 7.84919 9.90866 7.11944 9.90883ZM9.49019 27.2661H4.74381V11.996H9.49006V27.266L9.49019 27.2661ZM29.6292 0.00232899H2.36131C1.07256 -0.012171 0.015689 1.0202 -6.10352e-05 2.30895V29.6906C0.015189 30.98 1.07194 32.0133 2.36119 31.9998H29.6292C30.9212 32.0158 31.9821 30.9825 31.9999 29.6906V2.30683C31.9816 1.01558 30.9206 -0.016671 29.6292 0.000203987" fill="#0A66C2" />
                    </g>
                    <defs>
                        <clipPath id="clip0_67_26">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </a>
        </footer>
    )
}

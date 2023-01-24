import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

import Image from '../assets/img/empty-cart.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const CartEmpty: React.FC = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Koszyk jest pusty<span>😕</span></h2>
                <p>
                    Najprawdopodobniej nie zamówiłeś jeszcze pizzy.<br />
                    Aby zamówić pizzę, przejdź do strony głównej.
                </p>
                <div style={{'display': 'block', 'margin': '45px auto 60px', 'width': '300px', 'height': '255px'}}>
                    <LazyLoadImage className='cart__image' src={Image}  alt="Empty cart"  effect='blur'/>
                </div>
                <Link to="/" className="button button--black">
                    <span>Powrót</span>
                </Link>
            </div>
        </div>
    )
};

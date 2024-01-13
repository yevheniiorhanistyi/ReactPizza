import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

import Image from '../assets/img/empty-cart.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const CartEmpty: React.FC = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Cart is empty<span>😕</span></h2>
                <p>
                    You probably haven't ordered pizza yet.<br />
                    To order pizza, go to the main page.
                </p>
                <div style={{ 'display': 'block', 'margin': '45px auto 60px', 'width': '300px', 'height': '255px' }}>
                    <LazyLoadImage className='cart__image' src={Image} alt="Empty cart" effect='blur' />
                </div>
                <Link to="/" className="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </div>
    )
};

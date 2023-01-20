import { Link } from 'react-router-dom';

import Image from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Koszyk jest pusty<span>😕</span></h2>
                <p>
                    Najprawdopodobniej nie zamówiłeś jeszcze pizzy.<br />
                    Aby zamówić pizzę, przejdź do strony głównej.
                </p>
                <img width={300} height={255} className='cart__image' src={Image} alt="Empty cart" loading='lazy' />
                <Link to="/" className="button button--black">
                    <span>Powrót</span>
                </Link>
            </div>
        </div>
    )
};
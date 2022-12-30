import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png'

const CartEmpty = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Kosz pusty<span>😕</span></h2>
                <p>
                    Вероятней всего, вы не заказывали ещё пиццу.<br />
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img style={{ width: '300px', height: '255px' }} className='cart__image' src={cartEmptyImg} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </div>
    )
}

export default CartEmpty;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Preloader from './Preloader';
import cartEmptyImg from '../assets/img/empty-cart.png'

const CartEmpty = () => {
    const [loading, setLoading] = useState(true);

    const load = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1200);
    }

    useEffect(() => {
        load();
        return () => {
            clearTimeout(load);
        }
    }, [])

    return (
        <>
            {loading && <Preloader />}
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Корзина пустая <span>😕</span></h2>
                    <p>
                        Вероятней всего, вы не заказывали ещё пиццу.<br />
                        Для того, чтобы заказать пиццу, перейди на главную страницу.
                    </p>
                    <img className='cart__image' src={cartEmptyImg} alt="Empty cart" />
                    <Link to="/" className="button button--black">
                        <span>Вернуться назад</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CartEmpty;
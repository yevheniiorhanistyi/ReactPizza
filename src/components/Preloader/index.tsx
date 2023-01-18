import preloadImg from '../../assets/img/Preloader.svg';

import styles from './Preloader.module.scss';

export const Preloader: React.FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <img className={styles.image} src={preloadImg} alt="Preload" />
            </div>
        </div>
    )
};
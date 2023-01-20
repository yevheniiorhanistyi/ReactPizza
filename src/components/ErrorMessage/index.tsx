import img from './Error.gif';
import styles from './ErrorMessage.module.scss';

export const ErrorMessage: React.FC = () => {
    return (
        <img style={{ width: '250px', height: '250px' }} className={styles.image} src={img} alt="Not found" />
    )
}
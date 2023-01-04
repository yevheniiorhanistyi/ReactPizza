import img from './error.gif';
import styles from './errorMessage.module.scss';

const ErrorMessage: React.FC = () => {
    return (
        <img style={{ width: '250px', height: '250px' }} className={styles.image} src={img} alt="Not found" />
    )
}

export default ErrorMessage;
import SVG from '../assets/img/Preloader.svg';

const Spinner = () => {
    return (
        <img style={
            { 'display': 'block', 'margin': '15px auto' }
        } src={SVG} alt="" />
    )
}

export default Spinner;
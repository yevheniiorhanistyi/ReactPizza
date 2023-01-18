import { useDispatch } from 'react-redux';
import { setLoading } from "../redux/preload/slice";

import { NotFoundBlock } from "../components";

const NotFound = () => {
    const dispatch = useDispatch();
    dispatch(setLoading(false));

    return <NotFoundBlock />
}

export default NotFound;
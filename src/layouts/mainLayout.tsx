import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLoading } from '../redux/preload/selectors';
import { Preloader } from "../components";
import { Header } from '../components';

const MainLayout: React.FC = () => {
    const { loading } = useSelector(selectLoading);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                {loading && <Preloader />}
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
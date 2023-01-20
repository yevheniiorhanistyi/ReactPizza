import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLoading } from '../redux/preload/selectors';
import { Spinner } from "../components";
import { Header } from '../components';

const MainLayout: React.FC = () => {
    const { loading } = useSelector(selectLoading);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                {loading &&
                    <div className="spinner-wrapper">
                        <Spinner />
                    </div>
                }
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
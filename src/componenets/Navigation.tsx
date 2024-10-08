import React from 'react';
import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        /*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">*/
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-gray-950">
            <h3 className="font-bold">Some header</h3>
            <span>
                <Link to="/" className="mr-2">Home</Link>
                <Link to="/favourites">Favourites</Link>
            </span>
        </nav>
    );
};


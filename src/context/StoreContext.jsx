// import { papers_list } from "../assets/assets";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:5000"; // Adjust if needed

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [papers_list, setPapersList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`${url}/api/paper/list`);
                setPapersList(response.data.data);
            } catch (error) {
                console.error("Error fetching paper list:", error);
            }
        };
        fetchList();
    }, []);

    return (
        <StoreContext.Provider value={{ papers_list }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
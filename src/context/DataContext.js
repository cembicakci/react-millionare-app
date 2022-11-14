import React, { useState } from "react";
import axios from "axios";

const DataContext = React.createContext();

export const DataProvider = ({ children }) => {


    const [data, setData] = useState();
    const [question, setQuestion] = useState('');

    const fetchDatas = async () => {
        const response = await axios.get(`https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple`);
        setData(response.data.results)
    }

    const values = { fetchDatas, data, setData }

    return (

        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
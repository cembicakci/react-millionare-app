import React, { useState } from "react";
import axios from "axios";

const DataContext = React.createContext();

export const DataProvider = ({ children }) => {


    const [data, setData] = useState();
    const [question, setQuestion] = useState('');

    const fetchDatas = async () => {
        // const response = await axios.get(`https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple`);
        const response = await axios.get(`https://the-trivia-api.com/api/questions?limit=15&difficulty=medium`);
        setData(response.data)
    }

    const values = { fetchDatas, data, setData }

    return (

        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
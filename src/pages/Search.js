import React, { useEffect, useState } from 'react';
import Main from '../components/Main/main';
import newsApi from '../Services/newsApi';
import Header from '../components/Header/Header';

const Search = () => {
       
    console.log(Header.searchQuery)
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await newsApi.mainNews(newsApi.searchQuery);
                setNews(data);
            } catch (error) {
                console.error('Ana haberleri alma hatası:', error);
            }
        };
        fetchData();
    }, []); 

    return (
        <div>
            
            <Main news={news} />
        </div>
    );
}

export default Search;

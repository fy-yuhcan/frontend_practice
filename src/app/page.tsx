'use client';
import React, { useState, useEffect } from 'react';

interface ApiResponseItem {
    id: number;
    name: string;
    description: string;
}

const ApiTest: React.FC = () => {
    const [data, setData] = useState<ApiResponseItem[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/api/test')
            .then(response => response.json())
            .then((data: ApiResponseItem[]) => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const itemsPerPage = 1;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentPageData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <div>
            <h1>API Test</h1>
            {currentPageData.map((item) => (
                <div key={item.id}>
                    <h3>ID:{item.id} {item.name}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
            <div>
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button>
                <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default ApiTest;
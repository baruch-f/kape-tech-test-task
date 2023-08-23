import React from 'react';

const ResultsPage = ({ taskHistory }) => {
    return (
        <div className="results-page">
            <h1>Task History</h1>
            <ul>
                {taskHistory.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsPage;

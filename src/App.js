import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskHistory, setHistory] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const storedHistory = JSON.parse(localStorage.getItem('taskHistory')) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskHistory', JSON.stringify(taskHistory));
  }, [taskHistory]);

  return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
        </nav>
          <Routes>
            <Route
                path="/"
                exact
                element={
                        <HomePage
                              tasks={tasks}
                              setTasks={setTasks}
                              taskHistory={taskHistory}
                              setHistory={setHistory}
                        />}
            />
            <Route
                path="/results"
                element={<ResultsPage taskHistory={taskHistory} />}
            />
          </Routes>
      </Router>
  );
}

export default App;

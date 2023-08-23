import React, {useState, useRef, useEffect} from 'react';

const HomePage = ({ tasks, setTasks, taskHistory, setHistory }) => {
    const [taskText, setTaskText] = useState('');
    const inputRef = useRef(null);
    const [totalLetters, setTotalLetters] = useState(0);


    useEffect(() => {
            window.api?.response("letterCount", (data) => {
                setTotalLetters(data);
            });
            window.api?.request("letterCount", tasks);
    }, [tasks]);

    const handleAddTask = () => {
        if (taskText.trim() !== '') {
            const updatedTasks = [...tasks, taskText];
            setTasks(updatedTasks);
            setTaskText('');
            inputRef.current.focus();
            setHistory([...taskHistory, `Added task: ${taskText}`]);
        }
    };

    const handleCompleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = `✅ ${updatedTasks[index]}`;
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (index) => {
        const taskText = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setHistory([...taskHistory, `Removed task: ${taskText}`]);
    };

    return (
        <div className="home-page">
            <h1>Task Manager</h1>
            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span>{task}</span>
                        <button onClick={() => handleCompleteTask(index)}>Complete</button>
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <p>
                Total letters in tasks: {totalLetters}<br />
                <em>Counted with electron</em>
            </p>
        </div>
    );
};

export default HomePage;

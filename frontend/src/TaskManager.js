import React, { useEffect, useState } from 'react';
import { FaTasks, FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';

import './App.css';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            //upadte api call
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call')
            //create api call
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } =
                await CreateTask(obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } =
                await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }
    useEffect(() => {
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className="container mt-5">
    {/* Enhanced Heading */}
    <h1 className="text-center mb-4 heading">
        <FaTasks className="me-2" />
        Task Manager
    </h1>
    
    {/* Input and Search Section */}
    <div className="row mb-4">
        <div className="col-md-8 mb-2">
            <div className="input-group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="form-control"
                    placeholder="Add a new task"
                />
                <button
                    onClick={handleTask}
                    className="btn btn-success"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">
                    <FaSearch />
                </span>
                <input
                    onChange={handleSearch}
                    className="form-control"
                    type="text"
                    placeholder="Search tasks"
                />
            </div>
        </div>
    </div>

    {/* Task List */}
    <div className="row">
        {tasks.map((item) => (
            <div
                key={item._id}
                className="col-12 mb-2"
            >
                <div className="card p-3 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <span
                            className={
                                item.isDone
                                    ? "text-decoration-line-through text-muted"
                                    : ""
                            }
                        >
                            {item.taskName}
                        </span>
                        <div>
                            <button
                                onClick={() => handleCheckAndUncheck(item)}
                                className="btn btn-outline-success btn-sm me-2"
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={() => setUpdateTask(item)}
                                className="btn btn-outline-primary btn-sm me-2"
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(item._id)}
                                className="btn btn-outline-danger btn-sm"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>

    {/* Toastify */}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
    />
</div>

    )
}

export default TaskManager
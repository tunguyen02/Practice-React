import React, { useState } from 'react'

function NewTask({ onAdd }) {
    const [enterTask, setEnterTask] = useState('');

    const handleChange = (e) => {
        setEnterTask(e.target.value);
    }

    const handleClick = () => {
        if (enterTask.trim() === '') return;
        onAdd(enterTask);
        setEnterTask('');
    }

    return (
        <div className='flex items-center gP-4'>
            <input
                type="text"
                className='w-64 px-2 py-1 rounded-sm bg-stone-200'
                onChange={handleChange}
                value={enterTask}
            />
            <button
                className='text-stone-700 hover:text-stone-950'
                onClick={handleClick}
            >Add Task</button>
        </div>
    )
}

export default NewTask
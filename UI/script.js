document.addEventListener('DOMContentLoaded', function () {
    const tasksContainer = document.getElementById('tasks-container');
    const taskForm = document.getElementById('task-form');
    const cancelButton = document.getElementById('cancel-button');

    let tasks = [];

    function fetchTasks() {
        fetch('http://localhost:3000/api/tasks')
            .then(response => response.json())
            .then(data => {
                tasks = data;
                displayTasks();
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    function displayTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due Date: ${task.dueDate}</p>
                <button class="view-button" data-task-id="${task.id}">View</button>
                <button class="edit-button" data-task-id="${task.id}">Edit</button>
                <button class="delete-button" data-task-id="${task.id}">Delete</button>
            `;
            tasksContainer.appendChild(taskElement);
        });

        const viewButtons = document.querySelectorAll('.view-button');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-task-id');
                viewTask(taskId);
                
            });
        });

        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-task-id');
                editTask(taskId);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-task-id');
                deleteTask(taskId);
            });
        });
    }
    function viewTask(taskId) {
        fetch(`http://localhost:3000/api/tasks/${taskId}`)
            .then(response => response.json())
            .then(task => {
                alert(`Title: ${task.title}\nDescription: ${task.description}\nDue Date: ${task.dueDate}`);
            })
            .catch(error => console.error('Error fetching task details:', error));
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === parseInt(taskId));
        if (task) {
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            taskForm.dataset.taskId = taskId;
            taskForm.addEventListener('submit', updateTask);
            cancelButton.style.display = 'inline-block';
        }
    }

    function updateTask(event) {
        event.preventDefault();
        const taskId = parseInt(taskForm.dataset.taskId);
        const updatedTask = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            dueDate: document.getElementById('due-date').value
        };

        fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(task => {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            tasks[taskIndex] = task;
            displayTasks();
            taskForm.reset();
            delete taskForm.dataset.taskId;
            taskForm.removeEventListener('submit', updateTask);
            cancelButton.style.display = 'none';
        })
        .catch(error => console.error('Error updating task:', error));
    }

    function deleteTask(taskId) {
        fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(() => {
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            displayTasks();
        })
        .catch(error => console.error('Error deleting task:', error));
    }

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newTask = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            dueDate: document.getElementById('due-date').value
        };

        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(task => {
            tasks.push(task);
            displayTasks();
            taskForm.reset();
        })
        .catch(error => console.error('Error adding task:', error));
    });

    cancelButton.addEventListener('click', function () {
        taskForm.reset();
        delete taskForm.dataset.taskId;
        taskForm.removeEventListener('submit', updateTask);
        cancelButton.style.display = 'none';
    });

    fetchTasks();
});

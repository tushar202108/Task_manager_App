const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require ('path');

const app = express();
const PORT =  process.env.PORT || 3000;
app.use(express.static(__dirname +"/UI"));

let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-06-25' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-06-26' }
];
let nextTaskId = 3;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: nextTaskId++,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            id: taskId,
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running`);
});

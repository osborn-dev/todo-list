const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/Todo')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb+srv://chijiokerayeke:mycluster10@chijscluster.ra0gyf5.mongodb.net/task')


app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Find the task by id
        const task = await TodoModel.findById(id);
        // Toggle the 'done' state/ check box
        task.done = !task.done;
        await task.save();
        
        // Fetch the updated list of tasks
        const tasks = await TodoModel.find({});
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: 'Task deleted successfully', result });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
});


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
    .then(result => (result))
    .catch(err => (err))
})



const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
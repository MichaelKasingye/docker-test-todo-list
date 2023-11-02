import express from 'express';
const router = express.Router();

// Initialize an array to store todos
const todos: string[] = [];

// Create a new todo
router.post('/', (req, res) => {
  const { text } = req.body;
  try{
      if (text) {
        todos.push(text);
        res.status(201).json({ message: 'Todo created successfully' });
      } else {
        res.status(400).json({ error: 'Text is required to create a todo' });
      }

  }catch(error){
console.log('error',error);
  }
});

// Read all todos
router.get('/', (req, res) => {
  res.json({ todos });
});

// Delete a todo by its index
router.delete('/:index', (req, res) => {
  const { index } = req.params;
  const todoIndex = parseInt(index, 10);

  if (isNaN(todoIndex) || todoIndex < 0 || todoIndex >= todos.length) {
    res.status(400).json({ error: 'Invalid index for deleting todo' });
  } else {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully', deletedTodo });
  }
});

export default router;

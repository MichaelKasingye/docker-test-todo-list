import express from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todo';
const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());
// app.use('/todos', todoRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express Todo List!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/Mirai-Tech-DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  city: String,
});

const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/data', async (req, res) => {
  try {
    const newData = await DataModel.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: 'Could not add data' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const dataList = await DataModel.find();
    res.json(dataList);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch data' });
  }
});

app.get('/api/data/:id', async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch data for edit' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete data' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Or your preferred port

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/joblistings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  salary: String,
  location: String,
  image: String,
  link: String,
  approved: { type: Boolean, default: false },
});

const Job = mongoose.model('Job', jobSchema);

// Fetch all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ approved: true });
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch jobs awaiting approval
app.get('/api/admin/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ approved: false });
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Approve job
app.post('/api/admin/approve-job/:id', async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { approved: true });
    res.send('Job approved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

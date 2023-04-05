const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();
const port = 3000;

// Load environment variables from the .env file
require('dotenv').config();

// Initialize Supabase
const supabaseUrl = 'https://sajjcmymwqwiceounwvu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// Enable CORS
app.use(cors());

// Middleware to parse request body as JSON
app.use(express.json());

// Get KPIs
app.get('/kpis', async (req, res) => {
  try {
    const { data, error } = await supabase.from('kpis').select('*');
    if (error) {
      console.error(error.message);
      res.status(500).send('Error fetching KPIs from the database.');
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching KPIs from the database.');
  }
});

// Update KPIs
app.put('/kpis', async (req, res) => {
  const kpis = req.body;

  try {
    const updateKpi = async (kpi) => {
      const { error } = await supabase
        .from('kpis')
        .update({
          title: kpi.title,
          currentValue: kpi.currentValue,
          goal: kpi.goal,
        })
        .match({ id: kpi.id });

      if (error) {
        throw error;
      }
    };

    await Promise.all(kpis.map(updateKpi));
    res.status(204).send();
  } catch (error) {
    console.error('Error updating KPIs:', error);
    res.status(500).send('Error updating KPIs in the database.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

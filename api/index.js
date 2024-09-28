const express = require('express');
const app = express();
const { swaggerUi, swaggerDocs } = require('./docs/swagger');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Authentication routes
app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});




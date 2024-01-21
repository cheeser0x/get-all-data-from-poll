import express from 'express';
import randomDataGenerator from './dummyData/dataGenerator.js';
const app = express();
const port = 3030;
app.use(express.json());

const dummy_data = [
    {"id": 7, "name": "Mike Davis", "email": "mikedavis@example.com", "age": 27},
    {"id": 6, "name": "Mike Davis", "email": "mikedavis@example.com", "age": 27},
    {"id": 5, "name": "Emma Wilson", "email": "emmawilson@example.com", "age": 32},
    {"id": 4, "name": "Bob Brown", "email": "bobbrown@example.com", "age": 35},
    {"id": 3, "name": "Alice Johnson", "email": "alicejohnson@example.com", "age": 28},
    {"id": 2, "name": "Jane Smith", "email": "janesmith@example.com", "age": 25},
    {"id": 1, "name": "John Doe", "email": "johndoe@example.com", "age": 30}
];


const MAX_ITEMS = 100;
const UPDATE_INTERVAL = 9 * 1000; // 9 seconds

// Function to update the dummy data
function updateDummyData() {
    const lastItemId = dummy_data.length > 0 ? dummy_data[0].id : 0;
    const newData = randomDataGenerator(lastItemId);
    dummy_data.unshift(newData); // Add new data to the beginning of the array

    // Keep only the latest items
    if (dummy_data.length > MAX_ITEMS) {
        dummy_data.length = MAX_ITEMS; // Trim array to maximum size
    }
}

// Set an interval to update the dummy data
setInterval(updateDummyData, UPDATE_INTERVAL);



app.get('/', (req, res) => {
    res.send(dummy_data);
});

app.get('/path', (req, res) => {
    res.send('you just accessed a path');
});

app.post('/add', (req, res) => {
    const newData = req.body; // Ensure you have body-parser middleware to parse JSON body
    dummy_data.push(newData);
    res.send({ message: 'Data added successfully' });
});

// Route to update an item
app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    // Find index of the item to be updated
    const index = dummy_data.findIndex(item => item.id === id);

    if (index !== -1) {
        // Update the item at the found index
        dummy_data[index] = updatedData;
        res.send({ message: 'Data updated successfully' });
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

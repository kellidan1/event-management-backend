// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Event = require('./models/Event');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

mongoose.connect(`mongodb+srv://root:${process.env.MONGODB_PASS}@cluster0.clyxh.mongodb.net/eventmanagement?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//create event
app.post('/event', async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Received event data:", req.body);

    if (Object.keys(req.body).length === 0) {
        console.error("Request body is empty. Check Content-Type header and JSON parsing middleware.");
        return res.status(400).send("Request body is empty.");
    }

    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();
        res.status(201).send(savedEvent);
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(400).send(error);
    }
});



// Update Event
app.put('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Event
app.delete('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find(); // Retrieve all events from the database
        res.status(200).send(events);
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).send(error);
    }
});
// Get event by ID
app.get('/event/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.status(200).send(event);
    } catch (error) {
        console.error("Error retrieving event:", error);
        res.status(500).send(error);
    }
});
// // subevent
// app.post('/subevents', async (req, res) => {
//     const { eventId, subEvents } = req.body;

//     try {
//         // Assuming you have a SubEvent model
//         const savedSubEvents = await SubEvent.insertMany(subEvents.map(subEvent => ({
//             ...subEvent,
//             eventId // Associate with the main event
//         })));
//         res.status(201).send(savedSubEvents);
//     } catch (error) {
//         console.error("Error saving sub-events:", error);
//         res.status(400).send(error);
//     }
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const TimingSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

const VenueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
});

const SubeventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timings: { type: TimingSchema, required: true },
    venue: { type: VenueSchema, required: true },
});

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    timings: { type: TimingSchema, required: true },
    venue: { type: VenueSchema, required: true },
    subevents: [SubeventSchema]
});

const Event = mongoose.model('Event', EventSchema, "");
const Venue = mongoose.model('Venue', VenueSchema, "")

module.exports = {Event, Venue};
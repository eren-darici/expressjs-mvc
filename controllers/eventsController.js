const Event = require("../models/event");

// GET /events
const get = async (req, res) => {
    const events = await Event.find({});

    return res.status(200).send(events);
}

// GET /events/:id
const getWithID = async (req, res) => {
    const id = req.params.id;
    const event = await Event.findOne({_id: id});

    return res.status(200).send(event);
}

// POST /events
const post = async (req, res) => {
    const {title, description, application_link, application_deadline} = req.body;

    if (!(title && description && application_link && application_deadline)) {
        return res.status(400).send("One or more fields are missing: title, description, application_link");
    }

    const event = await Event.create({
        title: title,
        description: description,
        application_link: application_link,
        application_deadline: application_deadline
    })

    return res.status(200).send(event);
}

module.exports = {
    get,
    getWithID,
    post,
}
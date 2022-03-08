const Member = require("../models/member");

// GET /members
const get = async (req, res) => {
    const members = await Member.find({});
    return res.status(200).send(members);
}

// GET /members:id
const getWithID = async (req, res) => {
    const id = req.params.id;
    const member = await Member.findOne({_id: id});

    return res.status(200).send(member);
}

// POST /members
const post = async (req, res) => {
    try {
        const {first_name, last_name, email, department} = req.body;

        if (!(first_name && last_name && email && department)) {
            return res.status(400).send("All inputs are required");
        }

        // Check if member exists
        const oldMember = await Member.findOne({email});

        if (oldMember) {
            return res.status(400).send("Member already exists!");
        }

        // Create member
        const member = await Member.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            department
        })

        // Return new member
        return res.status(200).send(member);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    get,
    getWithID,
    post
}
const {Thoughts} = require("../models");

const getAllThoughts = async () => {
    const thoughts = await Thoughts.find();
    return thoughts;
}

const getOneThought = async(id) => {
    const thoughts = await Thoughts.findById(id);
    return thoughts;
}

const createThought = async(data) => {
    const thoughts = await Thoughts.create(data);
    return thoughts;
}

module.exports = { getAllThoughts, getOneThought, createThought };
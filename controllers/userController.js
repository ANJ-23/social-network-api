// refactoring: This finds users without needing routes to do so

// const router = require("express").Router();
const {User} = require("../models");

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

const getOneUser = async(id) => {
    const user = await User.findById(id);
    return user;
}

const createUser = async(data) => {
    const user = await User.create(data);
    return user;
}

module.exports = { getAllUsers, getOneUser, createUser };
import { v4 as uuidv4 } from "uuid";

import fs from "fs";

let users = [];

const readFromDatabase = () => {
  fs.readFile("./user.json", "utf-8", (err, jsonUser) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      users = JSON.parse(jsonUser);
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
  });
};

readFromDatabase();

const writeIntoDatabase = () => {
  fs.writeFile("./user.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("New Data added");
    }
  });
};

export const getUser = (req, res) => {
  readFromDatabase();
  res.send(users);
};

export const createUser = (req, res) => {
  const userId = uuidv4();
  const user = req.body;
  const userWithId = { id: userId, ...user };
  const userIntoJson = JSON.stringify(userWithId);
  users.push(userWithId);
  writeIntoDatabase();
  res.send(`User with the name ${user.firstName} added to the databse`);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  writeIntoDatabase();
  res.send(`User with th ${id} deleted from the database`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  let user = users.find((user) => user.id === id);
  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (age) {
    user.age = age;
  }
  writeIntoDatabase();
  res.send(`User with the id ${id} is updated`);
};

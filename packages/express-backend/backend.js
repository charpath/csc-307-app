import express, { json } from "express";
import { addUser, getUsers, findUserById, findByIdAndDelete } from "./services/user-service.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
 getUsers(name, job).then((result) => {
  if (result) { 
    res.send(result);
  } else {
    res.status(404).send('Not Found: ${id}');
 }
})});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd).then((result) =>
  res.status(201).send(result))
  .catch((error) => {console.log(error)})
});

const removeUser = (userToRemove) => {
  const ind = users["users_list"].indexOf(userToRemove)
  users["users_list"].splice(ind, 1);
};

app.delete("/users/:id", (req, res) => {

  findByIdAndDelete(req.params["id"]).then((result) => {
  if (result) {res.status(204).send()}})
    .catch((error) => {console.log(error)})
});
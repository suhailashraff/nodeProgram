const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let newArray = [];

const port = 8000;

// Adding Array //
app.post("/add", (req, res) => {
  const final = JSON.parse(req.body);

  const element = newArray.find((el) => el === final);

  if (element) {
    return res.status(404).json({
      status: "error",

      message: "This element already exists",
    });
  } else {
    newArray.push(final);
    console.log(newArray);
    return res.status(200).json({
      status: "success",
      message: "Element has been added",
      Array: newArray,
    });
  }
});

// deleting  Array //

app.delete("/delete", (req, res) => {
  const final = JSON.parse(req.body);

  const index = newArray.findIndex((el) => el === final);
  console.log(index);

  if (index) {
    newArray.splice(index, 1);
    console.log(`New array is ${newArray}`);

    return res.status(200).json({
      status: "success",
      message: "Element has been deleted",
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "Element not found",
    });
  }
});

// getting All data / Array //

app.get("/get", (req, res) => {
  if (newArray[1]) {
    console.log(`Your new Array is ${newArray}`);
    res.status(200).json({
      status: "success",
      message: "array printed",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "No Array found",
    });
  }
});

// Updating Array //
app.patch("/update", (req, res) => {
  const replace = req.body.replace;
  const wiith = req.body.with;

  const index = newArray.findIndex((el) => el === replace);
  newArray.splice(index, 1, wiith);
  res.status(200).json({
    status: "success",
    message: "Array element updated",
  });
  console.log(newArray);
});

app.listen(port, () => {
  console.log("server is listening...");
});

const express = require("express");
const app = express();
let users = [
  {
    name: "AkhilKumar",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: false,
      },
    ],
  },
];
app.use(express.json());

app.get("/", (req, res) => {
  let akhilkidneys = users[0].kidneys;
  let numberOfKidneys = akhilkidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < akhilkidneys.length; i++) {
    if (akhilkidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  let numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  if (isHealthy == true) {
    res.json({
      msg: "Healthy kidney is added!",
    });
  } else {
    res.json({
      msg: "Unhealthy is added!",
    });
  }
});

app.put("/", (req, res) => {
  if (isThereatleastOneUnhealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys[i].healthy = true;
    }
    res.json({
      msg: "All the kidneys are converted to healthy!",
    });
  } else {
    res.status(411).json({
      msg: "There are no unhealthy kidneys!",
    });
  }
});

app.delete("/", (req, res) => {
  if (isThereatleastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({
      msg: "Unhealthy kidneys are deleted!",
    });
  } else {
    res.status(411).json({
      msg: "You don't have any unhealthy kidney present!",
    });
  }
});

function isThereatleastOneUnhealthyKidney() {
  let atleastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastOneUnhealthyKidney = true;
    }
  }
  return atleastOneUnhealthyKidney;
}
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on the port:${port}`);
});

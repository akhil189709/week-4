const express = require("express");
const app = express();
app.use(express());

function calculateSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
}

app.get("/sum", (req, res) => {
  let n = req.query.n;
  let ans = calculateSum(n);
  res.send(`The sum till ${n} is ${ans.toString()}  ${typeof ans} `);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on the port:${port}`);
});

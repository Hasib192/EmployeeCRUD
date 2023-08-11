const app = require("./app");
const { PORT } = require("./secret");

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

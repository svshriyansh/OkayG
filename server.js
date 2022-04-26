const express = require("express");
const bodyParser = require("body-parser");
const { fetchPath, updateFile } = require("./utils/github");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "test page",
  });
});

app.put("/update", async (req, res) => {
  const { owner, repository, path, content, message } = req.body;
  let sha = null;
  const encodedContent = Buffer.from(content).toString("base64");
  console.log(encodedContent);
  const exists = await fetchPath({ owner, repository, path });
  if (exists) {
    sha = exists.sha;
  }
  const response = await updateFile({
    owner,
    repository,
    path,
    content: encodedContent,
    message,
    sha,
  });
  res.status(200).json({ response });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

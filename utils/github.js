const axios = require("axios");
require("dotenv").config();

async function fetchPath({ owner, repository, path }) {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repository}/contents/${path}`
    );

    return res.data;
  } catch (e) {
    return null;
  }
}

async function updateFile({ owner, repository, path, content, message, sha }) {
  try {
    const res = await axios.put(
      `https://api.github.com/repos/${owner}/${repository}/contents/${path}`,
      {
        content,
        message,
        sha: sha ? sha : undefined,
      },
      {
        auth: {
          username: process.env.username,
          password: process.env.password,
        },
      }
    );

    return res.data;
  } catch (e) {
    return null;
  }
}
module.exports = { fetchPath, updateFile };

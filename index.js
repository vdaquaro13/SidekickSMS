//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
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-aHLtnJ0Cyx3dheV0cM06Bdbh",
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 1000,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

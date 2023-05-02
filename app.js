const express = require('express');
const app = express();
const Gtts = require('gtts')
const  bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs');
app.set('view engine', 'ejs');
var gptPrompt = 'kia tumari zindagi ki value insan se zada hai?'
var prompt


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const gpt3= async (text) => {
    try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 3000
    });
    console.log(completion.data.choices[0].text);
    prompt = completion.data.choices[0].text;
        
} catch (error) {
    console.log(error);
}
}

gpt3(gptPrompt);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/bolo', function (req, res) {
    res.render('speach');
});

app.post('/', function (req, res) {
    const text = req.body.text;
    const gpt = prompt
    var lang = 'hi';
    var path = Date.now() + '.mp3';
    const mp3 = new Gtts(gpt, lang);
    mp3.save(path,(err,result) => {
        if (err) {
            
            FileSystem.unlinkSync(path);
            res.send('not done');
        }
        res.download(path); 
    })
})

app.listen(3000, function () {
    console.log('listening on port 3000!');
//   console.log('Open url to hear Hallelujah http://localhost:3000/hear?lang=en&text=meralunpakarabrar');
});

// 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
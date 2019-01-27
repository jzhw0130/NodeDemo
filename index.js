import express from 'express';
import bodyParser from 'body-parser';

var app = new express();

app.get('/status', (req, res) => {
    res.status(200).send({
        'status': 'Success'
    })
})

app.listen(process.env.port|3000, () => {
    console.log(`Server start at port ${process.env.port|3000}`);
})
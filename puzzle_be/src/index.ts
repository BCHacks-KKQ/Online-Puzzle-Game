import generatePuzzle from "./generatePuzzle";
import express from 'express';

const PORT = process.env.PORT || 3000;
const INDEX = '/';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);

let NUMROWS = 10;
let NUMCOLS = 10;

let dataInfo = { image: Math.floor(Math.random() * 2), pieces: generatePuzzle({ x: NUMROWS, y: NUMCOLS }) };

let correctPattern: any = [];
for (let i = 0; i < NUMCOLS; i++) {
    correctPattern[i] = [];
    for (let j = 0; j < NUMROWS; j++) {
        correctPattern[i][j] = { posX: j * 100, posY: i * 100 };
    }
}

let currentPattern = [];

io.on('connection', (socket: any) => {
    console.log(socket.id);
    io.emit('initialData', dataInfo);
    socket.on("sendData", (data: any) => {
        data = checkCorrectPattern(data);
        socket.broadcast.emit("sendData", data);
    })
});

const checkCorrectPattern = (data: any) => {
    let flag = false;
    for (let i = 0; i < data.pieces.length; i++) {
        if (flag) break;
        for (let j = 0; j < data.pieces[i].length; j++) {
            if (data.pieces[j][i].posX != correctPattern.posX || data.pieces[j][i].posY != correctPattern.posY) {
                flag = true;
                break;
            }
        }
    }

    if (flag) {
        return data;
    }

    dataInfo = { image: Math.floor(Math.random() * 2), pieces: generatePuzzle({ x: NUMROWS, y: NUMCOLS }) };

    return dataInfo;

    //if true do randomizePattern function and send new data
    //if false just send data to clients
}

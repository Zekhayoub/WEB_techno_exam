const express = require('express');
const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const model = require('./models/model.js');

const getRoomData = (response) => {
    model.getAllRooms((error, resultSQL) => {
        if (error) {
            response.status(400).send(error);
        } else {
            let dataBase = {};
            response.status(200);
            dataBase.roomTable = resultSQL;

            console.log(dataBase);
            response.render('home.ejs', dataBase);
        }
    });
};

const addRoom = (roomName, roomLength, roomWidth, response) => {
    model.insertRoom(roomName, roomLength, roomWidth, (insertErr, result) => {
        if (insertErr) {
            console.error('Error adding room:', insertErr);
            return;
        }
        console.log(`Room "${roomName}" added successfully with ID ${result.insertId}`);
        getRoomData(response);
    });
};

const deleteRoomById = (roomId, response) => {
    model.deleteRoom(roomId, (deleteErr, result) => {
        if (deleteErr) {
            console.error('Error deleting room:', deleteErr);
            return;
        }
        console.log(`Room with ID ${roomId} deleted successfully: ${JSON.stringify(result)}`);
        getRoomData(response);
    });
};

app.post('/addRoom', (request, response) => {
    const { roomName, roomLength, roomWidth } = request.body;
    if (roomName && roomLength && roomWidth) {
        addRoom(roomName, roomLength, roomWidth, response);
    }
});

app.post('/deleteRoom', (request, response) => {
    const { deleteRoom } = request.body;
    if (deleteRoom) {
        deleteRoomById(deleteRoom, response);
    }
});

app.get('/', (request, response) => {
    getRoomData(response);
});

app.listen(80, function () {
    console.log("Server ok, 80");
});

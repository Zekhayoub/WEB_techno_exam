const connection = require('./db.js');   // Attention ../db.js car on est dans models/model.js ---->CHANGEMENT de dossier = OK FAIT !

const getAllRooms = (callback) => {
    connection.query("SELECT * FROM rooms;", callback);
};

const insertRoom = (roomName, roomLength, roomWidth, callback) => {
    const insertQuery = 'INSERT INTO rooms (name, length, width) VALUES (?, ?, ?)';
    connection.query(insertQuery, [roomName, roomLength, roomWidth], callback);
};

const deleteRoom = (roomId, callback) => {
    const deleteQuery = 'DELETE FROM rooms WHERE id = ?';
    connection.query(deleteQuery, [roomId], callback);
};

module.exports = {
    getAllRooms,
    insertRoom,
    deleteRoom
};

const express = require('express');
const meetingsRouter = express.Router();

const { getAllFromDatabase, createMeeting, deleteAllFromDatabase, addToDatabase } = require('./db');

const modelType = 'meetings';

meetingsRouter.get('/', (req, res, next) => {
	const response = getAllFromDatabase(modelType);
	res.status(200).send(response);
});

meetingsRouter.post('/', (req, res, next) => {
	const response = addToDatabase(modelType, createMeeting());
	res.status(201).send(response);
});

meetingsRouter.delete('/', (req, res, next) => {
	const response = deleteAllFromDatabase(modelType);
	if (response) {
		res.status(204).send();
	} else {
		res.status(500).send();
	}
});

module.exports = meetingsRouter;

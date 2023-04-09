const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const modelType = 'ideas';

ideasRouter.get('/', (req, res, next) => {
	const response = getAllFromDatabase(modelType);
	res.status(200).send(response);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
	const response = addToDatabase(modelType, req.body);
	res.status(201).send(response);
});

ideasRouter.get('/:ideasId', (req, res, next) => {
	const response = getFromDatabaseById(modelType, req.params.ideasId);
	if (!response) {
		res.status(404).send();
	} else {
		res.status(200).send(response);
	}
});

ideasRouter.put('/:ideasId', (req, res, next) => {
	const response = updateInstanceInDatabase(modelType, req.body);
	if (!response) {
		res.status(404).send();
	} else {
		res.status(200).send(response);
	}
});

ideasRouter.delete('/:ideasId', (req, res, next) => {
	const response = deleteFromDatabasebyId(modelType, req.params.ideasId);
	if (!response) {
		res.status(404).send();
	} else {
		res.status(204).send(response);
	}
});

module.exports = ideasRouter;

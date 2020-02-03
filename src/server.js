import * as sapper from '@sapper/server';

const express = require('express');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = new express();

app.use(sapper.middleware());

app.listen(PORT, () => {
	console.log('App started and available at http://localhost:3000');
});
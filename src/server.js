import * as sapper from '@sapper/server';

let express = require('express'),
	path =require("path");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

let app = new express();

app.use(sapper.middleware());
app.use(express.static(path.join(__dirname, "../static")));

app.listen(PORT, () => {
	console.log(`App started and available at http://localhost:${PORT}`);
});
import * as sapper from '@sapper/app';
import {connect} from './routes/networking';

//connect();

sapper.start({
	target: document.querySelector('#sapper')
});
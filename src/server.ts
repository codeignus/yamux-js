import {Config} from './mux';
import {Session} from './session';

export class Server extends Session {
    constructor(config?: Config) {
        super(false, config);
    }
}

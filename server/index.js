import 'dotenv/config';
import { logInfo } from './util/logger';
import server from './server';

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
    
    logInfo(`App listening on port ${PORT}!`);
});

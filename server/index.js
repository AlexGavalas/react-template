import { logInfo } from './util/logger';
import server from './server';

const PORT = 3001;

server.listen(PORT, () => {
    
    logInfo(`App listening on port ${PORT}!`);
});

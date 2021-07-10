import * as campaignRouter from './campaigns/routes';
import * as contractRouter from './contracts/routes';
import * as mechRouter from './mechs/routes';
import * as opsRouter from './operations/routes';
import * as pilotRouter from './pilots/routes';
import * as userRouter from './users/routes';

const routes = {
  '/campaigns': campaignRouter,
  '/contracts': contractRouter,
  '/mechs': mechRouter,
  '/ops': opsRouter,
  '/pilots': pilotRouter,
  '/': userRouter,
};

export default routes;

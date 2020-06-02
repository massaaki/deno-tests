import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUsers, getUser, addUser, updateUser } from './controller/UserController.ts';

const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = "hello deno!";
});

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);
router.put('/users/:id', updateUser);

export default router;
import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = "Hello!";
  
  const dir = Deno.readDirSync(Deno.cwd());
  console.log(dir, dir.map(d => d.name));
  
  Promise.all([import('./deps.ts')])
    .then(console.log)
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });

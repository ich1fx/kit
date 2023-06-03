import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = "Hello!";
  
  const dir = Array.from(Deno.readDirSync(Deno.cwd() + '/src'))
    .filter(file => file.name.endsWith('.ts'));
  Promise.all(dir.map(file => import(`./${file.name}`)))
    .then(console.log);
  
  console.log('for of method');
  for (const file of dir) {
    const route = await import(`./$(file.name}`);
    console.log(route);
  }
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });

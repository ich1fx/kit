import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = "Hello!";
  
  const dir = Deno.readDirSync(Deno.cwd());
  console.log(Array.from(dir));
  
  const imported = Array.from(dir)
    .filter(file => file.name.endsWith('.ts'))
    .map(async file => await import(file));
  console.log(imported);
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });

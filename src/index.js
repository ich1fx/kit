import { oak } from './deps.js';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = 'Hello World!';
  
  const conn = await Deno.listen({ hostname: 'wss://gateway.discord.gg/?v=10&encoding=json', port: 80, transport: 'tcp' });
  const httpConn = Deno.serveHttp(conn);
  
  for await (const requestEvent of httpConn) {
    await requestEvent.respondWith(handleRequest(requestEvent.request));
  }
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });

function handleRequest(request) {
  const upgrade = request.headers.get('upgrade') || '';
  if (upgrade.toLowerCase() !== 'websocket') return new Response('Websocket upgrade request: false');
  
  const { socket, response } = Deno.upgradeWebSocket(request);
  
  socket.onopen = () => console.log('WebSocket opened!');
  socket.onmessage = (data) => console.log('WebSocket message:', data);
  socket.onclose = () => console.log('WebSocket closer!');
  
  return response;
}

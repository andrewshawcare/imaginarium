import Fastify from "fastify";

import ConfigPlugin from "./plugins/config-plugin.js";
import CorsPlugin from "./plugins/cors-plugin.js";
import RateLimitPlugin from "./plugins/rate-limit-plugin.js";
import StaticPlugin from "./plugins/static-plugin.js"

import DalleGenerateImageRoute from "./routes/dalle-generate-image-route.js"
import GoogleImagesSearchRoute from "./routes/google-images-search-route.js";
import MidjourneyGenerateImageRoute from "./routes/midjourney-generate-image-route.js";

const fastify = Fastify();

await ConfigPlugin.register(fastify);
await CorsPlugin.register(fastify);
await RateLimitPlugin.register(fastify);
await StaticPlugin.register(fastify);

DalleGenerateImageRoute.register(fastify);
GoogleImagesSearchRoute.register(fastify);
MidjourneyGenerateImageRoute.register(fastify);

fastify.get('/health', {}, (request, reply) => {
    reply.status(200).send();
})

fastify.listen({ host: '0.0.0.0', port: fastify.config.PORT })

console.log(`Server listening on port ${fastify.config.PORT}`)
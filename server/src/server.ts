import Fastify from "fastify";
import { PrismaClient } from '@prisma/client';
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { pollRoutes } from './routes/poll';
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

const prisma = new PrismaClient({
    log: ['query'],
});

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    // em producao isso deve ser uma variavel de ambiente e nao hard coded
    await fastify.register(jwt, {
        secret: 'nlwcopa',
    });

    fastify.register(pollRoutes);
    fastify.register(authRoutes);
    fastify.register(gameRoutes);
    fastify.register(guessRoutes);
    fastify.register(userRoutes);

    await fastify.listen({ port: 3333, host: '0.0.0.0' });
};

bootstrap();
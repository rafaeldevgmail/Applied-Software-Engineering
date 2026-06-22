// prisma.config.js
import dotenv from 'dotenv';

export default {
    schema: {
        kind: 'single',
        path: './prisma/schema.prisma',
    },
    migrate: {
        url: process.env.DATABASE_URL,
    },
};
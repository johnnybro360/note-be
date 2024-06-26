import {PrismaClient} from "@prisma/client";
import {INestApplication, Injectable, OnModuleInit} from "@nestjs/common";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-ignore
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}
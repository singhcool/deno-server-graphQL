import { Application } from "./config/deps.ts";
import { applyGraphQL } from "./config/deps.ts";
import { Schema } from "./schema/index.ts";
import { resolvers } from "./resolver/index.ts";

export class App {
  public app: Application;
  public port: number;
  public logger: any;

  constructor(port: any) {
    this.app = new Application();
    this.port = port;
    
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  // initialize middleware
  private initializeMiddleware() {

    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    });

  }

  // initialize routes
  private async initializeRoutes() {
    const GraphQLService = await applyGraphQL({
        path: '/graphql',
        typeDefs: Schema,
        resolvers: resolvers,
        context: (ctx) => {}
      });

    this.app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

  }
  // server listen
  public async listen() {
    return await this.app.listen({ port: this.port });
  }
}

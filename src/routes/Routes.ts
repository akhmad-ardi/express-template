import { Router, IRouter, RequestHandler } from 'express';

class Routes {
  routes: Router;

  constructor() {
    this.routes = Router();
  }

  public getRoutes(): IRouter {
    return this.routes;
  }

  public Get(path: string, ...handler: RequestHandler[]): void {
    this.routes.get(path, handler);
  }

  public Post(path: string, ...handler: RequestHandler[]): void {
    this.routes.post(path, handler);
  }

  public Put(path: string, ...handler: RequestHandler[]): void {
    this.routes.put(path, handler);
  }

  public Patch(path: string, ...handler: RequestHandler[]): void {
    this.routes.patch(path, handler);
  }

  public Delete(path: string, ...handler: RequestHandler[]): void {
    this.routes.delete(path, handler);
  }
}

export default Routes;

type EventHandler<T> = (event: T) => void | Promise<void>;

export class EventBus {
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  subscribe<T>(eventClass: new (...args: any[]) => T, handler: EventHandler<T>) {
    const key = eventClass.name;
    if (!this.handlers.has(key)) this.handlers.set(key, []);
    this.handlers.get(key)!.push(handler as EventHandler<any>);
  }

  async publish<T>(event: T): Promise<void> {
    const key = (event as any).constructor.name;
    const handlers = this.handlers.get(key) || [];
    for (const handler of handlers) {
      await handler(event);
    }
  }
}

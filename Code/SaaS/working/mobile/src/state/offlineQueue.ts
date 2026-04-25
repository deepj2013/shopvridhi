type QueueEvent = {
  id: string;
  endpoint: string;
  method: 'POST' | 'PATCH' | 'DELETE';
  payload: Record<string, unknown>;
};

const queue: QueueEvent[] = [];

export function enqueue(event: QueueEvent) {
  queue.push(event);
}

export function getQueueSize() {
  return queue.length;
}

export async function retryQueued(send: (event: QueueEvent) => Promise<void>) {
  while (queue.length) {
    const next = queue.shift();
    if (!next) break;
    await send(next);
  }
}

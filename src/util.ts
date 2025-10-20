// semaphore. It is sized to the AcceptBacklog which
// is assumed to be symmetric between the client and server. This allows
// the client to avoid exceeding the backlog and instead blocks the open.
export class Semaphore {
    private permits: number;
    private waitQueue: Array<() => void> = [];

    constructor(permits: number) {
        this.permits = permits;
    }

    async acquire(): Promise<void> {
        return new Promise((resolve) => {
            if (this.permits > 0) {
                this.permits--;
                resolve();
            } else {
                this.waitQueue.push(resolve);
            }
        });
    }

    release(): void {
        if (this.waitQueue.length > 0) {
            const resolve = this.waitQueue.shift()!;
            resolve();
        } else {
            this.permits++;
        }
    }
}

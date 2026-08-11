import type { WorkerEnv } from './env';
import type { Arrayable, Promisable } from '@almighty-shogun/utils';

export type ScheduledRun = {
    readonly controller: ScheduledController;
    readonly ctx: ExecutionContext;
    readonly cron: string;
};

export type ScheduledHandler = (run: ScheduledRun, env: WorkerEnv) => Promisable<void>;

export type ScheduledDefinition<Cron extends string = string> = {
    readonly cron: Cron;
    readonly handler: ScheduledHandler;
};

export type ScheduledExport = Arrayable<ScheduledDefinition<any>>;

export type ScheduledCollection = Record<string, ScheduledExport>;

export type CompiledScheduled = {
    readonly cron: string;
    readonly handlers: readonly ScheduledHandler[];
};

export type CompiledScheduledCollection = readonly CompiledScheduled[];

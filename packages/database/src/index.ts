import { ITaskRepository } from './repository';
import { LocalTaskRepository } from './localRepository';

export * from './repository';
export * from './localRepository';

export function getTaskRepository(): ITaskRepository {
  return new LocalTaskRepository();
}

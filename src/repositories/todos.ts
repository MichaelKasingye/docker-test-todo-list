import { dataSource } from '../data-source';
import { Todo} from '../models/todo';

export const TodoRepository = dataSource.getRepository(Todo).extend({});

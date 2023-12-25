import { User } from '../user.schema';

export type TCurrentUser = Pick<User, 'email'> & { _id: string };

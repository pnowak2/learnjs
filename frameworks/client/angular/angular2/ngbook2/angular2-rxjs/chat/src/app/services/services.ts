import {messagesServiceInjectables} from './messages.service';
import {threadsServiceInjectables} from './threads.service';
import {userServiceInjectables} from './user.service';

export * from './messages.service';
export * from './threads.service';
export * from './user.service';

export var servicesInjectables: Array<any> = [
  messagesServiceInjectables,
  threadsServiceInjectables,
  userServiceInjectables
];

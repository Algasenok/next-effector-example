import { createGIPFactory, createGSPFactory } from 'nextjs-effector';
import { createEvent } from 'effector';

export const appStarted = createEvent();

export const createGIP = createGIPFactory({
  sharedEvents: [appStarted],
});

export const createGSP = createGSPFactory();

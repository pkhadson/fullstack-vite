import { AsyncLocalStorage } from "async_hooks";

export const hooks = new AsyncLocalStorage();

export const getStore = () => hooks.getStore() as Map<string, any>;

export const getStoreValue = (key: string) => getStore().get(key);

export const setStoreValue = (key: string, value: any) =>
  getStore().set(key, value);

export const getRequest = () => getStoreValue("req");

export const getResponse = () => getStoreValue("res");

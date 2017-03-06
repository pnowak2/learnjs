import { OpaqueToken } from "@angular/core";

export const CONFIG = {
  apiUrl: 'http://my.api.com',
  theme: 'suicid-squad',
  title: 'My awesome app'
};

export const Token: OpaqueToken = new OpaqueToken('config');
// No error
export const Token2: OpaqueToken = new OpaqueToken('config');
declare module "murl" {
  export interface Url {
      protocol?: string;
      hostname?: string;
      pathname?: string;
  }

  export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "mpath" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}

declare module "*.txt" {
  const content: string;
  export default content;
}

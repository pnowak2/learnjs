// Module resolution strategy

// RELATIVE
// import { b } from "./moduleB" in /root/src/moduleA.ts;

// /root/src/moduleB.ts
// /root/src/moduleB.tsx
// /root/src/moduleB.d.ts
// /root/src/moduleB/package.json (if it specifies a "typings" property)
// /root/src/moduleB/index.ts
// /root/src/moduleB/index.tsx
// /root/src/moduleB/index.d.ts

// NON RELATIVE
// import { b } from "moduleB" in source file /root/src/moduleA.ts;

// /root/src/node_modules/moduleB.ts
// /root/src/node_modules/moduleB.tsx
// /root/src/node_modules/moduleB.d.ts
// /root/src/node_modules/moduleB/package.json (if it specifies a "typings" property)
// /root/src/node_modules/moduleB/index.ts
// /root/src/node_modules/moduleB/index.tsx
// /root/src/node_modules/moduleB/index.d.ts

// /root/node_modules/moduleB.ts
// /root/node_modules/moduleB.tsx
// /root/node_modules/moduleB.d.ts
// /root/node_modules/moduleB/package.json (if it specifies a "typings" property)
// /root/node_modules/moduleB/index.ts
// /root/node_modules/moduleB/index.tsx
// /root/node_modules/moduleB/index.d.ts

// /node_modules/moduleB.ts
// /node_modules/moduleB.tsx
// /node_modules/moduleB.d.ts
// /node_modules/moduleB/package.json (if it specifies a "typings" property)
// /node_modules/moduleB/index.ts
// /node_modules/moduleB/index.tsx
// /node_modules/moduleB/index.d.ts


// PATH MAPPINGS

// {
//   "compilerOptions": {
//     "baseUrl": ".", // This must be specified if "paths" is.
//     "paths": {
//       "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
//     }
//   }
// }
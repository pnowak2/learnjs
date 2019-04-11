import { anotherHi } from "./5.export-as-rename";
import AdminUser from "./6.export-default";
import sh from './7.default-alias';

export { months as iMonths } from "./1.export-before-declarations";
export { sayHi as iSayHi } from "./2.export-apart-from-declarations";
export { sayBye as iSayBye } from "./3.import-as-star";

export { anotherHi as iAnotherHi, AdminUser as iAdminUser, sh as iSh };
import { types } from "pg";

types.setTypeParser(20, (val: string) => parseInt(val));

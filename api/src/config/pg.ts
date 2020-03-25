import { types } from "pg";

types.setTypeParser(20, val => parseInt(val));

import * as admin from "firebase-admin";
admin.initializeApp();
import getContentFromCoda from "./getContentFromCoda";
import addResponseToCoda from "./addResponseToCoda";

export { getContentFromCoda, addResponseToCoda };

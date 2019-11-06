import * as functions from "firebase-functions";
import Coda from "coda-js";

const coda = new Coda(functions.config().coda.token);

const addResponseToCoda = functions
  .region("europe-west1")
  .firestore.document("/responses/{responseId}")
  .onCreate(async (snap, context) => {
    const responsesTable = await coda.getTable("tRTyabAVU6", "grid-0pcy7etid6");

    return responsesTable
      .insertRows([
        [
          { column: "Firebase Response ID", value: snap.id },
          { column: "Colour", value: snap.get("colour") },
          { column: "Browser", value: snap.get("browser") }
        ]
      ])
      .catch((err: any) => console.log(err));
  });

export default addResponseToCoda;

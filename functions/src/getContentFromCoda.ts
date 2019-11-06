import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Coda from "coda-js";
const firestore = admin.firestore();

const coda = new Coda(functions.config().coda.token);

const updateContent = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const contentTable = await coda.getTable("tRTyabAVU6", "grid-2AK2W-Q6-o");

    const content = await contentTable.listRows({
      useColumnNames: true
    });

    const coloursTable = await coda.getTable("tRTyabAVU6", "grid-8w1E4t4TbH");

    const colours = await coloursTable.listRows({
      useColumnNames: true
    });

    const contentObj = content.reduce(
      (
        obj: { [x: string]: any },
        val: { values: { label: any; value: any } }
      ) => {
        obj[val.values.label] = val.values.value;
        return obj;
      },
      {}
    );

    const combinedContent = Object.assign({}, contentObj, {
      colours: colours.map(
        (colour: { values: { label: any; value: any } }) => ({
          label: colour.values.label,
          value: colour.values.value
        })
      )
    });

    return firestore
      .collection("content")
      .doc("content")
      .set(combinedContent)
      .then((success: any) =>
        res.send(`
        <div style="height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 15rem;">
          ✌️
        </div>`)
      )
      .catch((error: any) => {
        console.log(error);
        res.status(500).send("Error updating Firebase");
      });
  });

export default updateContent;


const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.getDownloadUrl = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const bucket = admin.storage().bucket();
  console.log('object: ', object.name);
  if (filePath.startsWith('images/')) {
    bucket.file(filePath).getSignedUrl({ action: 'read', expires: '03-17-2025'})
      .then( result => {
        console.log('download Url : ', result[0]);
        db.collection('images').doc(`${object.name}`)
          .set({
            name: object.name,
            url: result[0],
          }).then( doc => {
            console.log('object created => ', doc);
          }).catch( err => console.log('err: ', err))
      }).catch( err => console.log(err))
  }
});

exports.deleted = functions.storage.object().onDelete(async (object) => {
  console.log('object: ', object.name);
});

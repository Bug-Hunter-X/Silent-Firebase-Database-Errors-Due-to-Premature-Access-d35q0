The solution involves waiting for Firebase to properly initialize before accessing the database.  You can use the `onAuthStateChanged` listener (if authentication is involved) or the promise returned by `initializeApp` to ensure the Firebase app is ready.

```javascript
// Correct Code using onAuthStateChanged
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase.database().ref('/users').once('value').then(function(snapshot) {
      // ... process snapshot ...
    });
  }
});

// Correct Code using initializeApp's promise
firebase.initializeApp(firebaseConfig).then(() => {
  firebase.database().ref('/users').once('value').then(function(snapshot) {
    // ... process snapshot ...
  });
}).catch(error => {
  console.error("Firebase initialization error:", error);
});
```
This ensures that database operations only occur after Firebase is initialized, preventing silent failures.
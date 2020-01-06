import * as firebase from 'firebase'

export default function DB() {

    let firebaseProject = null;

    const firebaseInit = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyDKuA_rd0CBTjtumUxtV8iE7e8dJljz5o8",
            authDomain: "igetfit.firebaseapp.com",
            databaseURL: "https://igetfit.firebaseio.com",
            projectId: "igetfit",
            storageBucket: "igetfit.appspot.com",
            messagingSenderId: "315482937147",
            appId: "1:315482937147:web:36e0953768b874fd33c91e",
            measurementId: "G-YPND24F0WC"
        };    
        if (!firebase.apps.length) {
            firebaseProject = firebase.initializeApp(firebaseConfig); 
        }        
    }


    const fetchGoals = (callback) => {
    var db = firebase.firestore();
    let goals = [];
    db.collection("goals").get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
        goals.push(doc.data());

    }); 
    callback(goals);
    }).catch(function(error){
        console.log(error);
    })
    };

    const fetchTargets = (callback) => {
    let goals = [];
    const db = firebase.firestore();
    db.collection("goals").get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
        goals.push(doc.data());
    }); 
    callback(goals);
    }).catch(function(error){
        console.log(error);
        callback(null);
    })
    };    

    const saveActivity = (user, activity) => {
    const db = firebase.firestore();
    var record = {
        user: user,
        ts: new Date(),
        activity: activity,
        qty: 5
    };
    db.collection("activity").add(record)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    };

    return {
        fetchGoals: fetchGoals,
        fetchTargets: fetchTargets,
        saveActivity:saveActivity,
        firebaseInit:firebaseInit
    }
}
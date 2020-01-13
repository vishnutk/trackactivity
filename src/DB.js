import * as firebase from 'firebase'

export default function DB() {

    let firebaseProject = null;
    let user = null;
    let targets = null;
    let goals = null;

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
            
            // console.log( "testing..in DB" );
            // var auth = firebase.auth();
            // console.log(firebaseProject);
            // console.log(auth);
            // console.log(auth.currentUser);             
        }                
    }


    const getGoals = (callback) => {
        if (goals) {
            callback(goals);
        } else {
            fetchGoals(callback);
        }
    };

    const getUser = () => {
        return user;
    };

    const setUser = (u) => {
        user = u;
    }

    const getTargets = (callback) => {
        if (targets) {
            callback(targets);
        } else {
            fetchTargets(callback);
        }
    };

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

    const fetchTargets = (callback, user) => {
    let goals = [];
    const db = firebase.firestore();

    console.log("Fetch Targets:" + user);
    db.collection("targets").where('user', '==', user).get().then(function(querySnapshot) {
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

    const saveActivity = (user, activity, qty) => {
    const db = firebase.firestore();
    var record = {
        user: user,
        ts: new Date(),
        activity: activity,
        qty: qty
    };
    db.collection("activity").add(record)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    };

    const saveTarget = (user, activity, target, unit) => {
        const db = firebase.firestore();
        var record = {
            user: user,
            lastModified: new Date(),
            startDate: new Date(),
            goal: activity,
            target: target,
            unit: unit
        };
        db.collection("targets").add(record)
        .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            //console.error("Error adding document: ", error);
        });
        };
    
    return {
        fetchGoals: fetchGoals,
        fetchTargets: fetchTargets,
        saveActivity: saveActivity,
        saveTarget: saveTarget,
        firebaseInit:firebaseInit,
        getGoals: getGoals,
        getTargets: getTargets,
        getUser: getUser,
        setUser: setUser
    }
}
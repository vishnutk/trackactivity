import * as firebase from 'firebase'

export default function DB() {
    let user = null;
    let targets = null;
    let goals = null;
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
                goals.push(doc.data());
            }); 
            callback(goals);
        }).catch(function(error){
            console.log(error);
            callback(goals);
        })
    };

    const fetchTargets = (callback, user) => {
        let goals = [];
        const db = firebase.firestore();

        db.collection("targets").where('user', '==', user).get().then(function(querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const data = doc.data();
                data.id = doc.id;
                goals.push(data);
            }); 
            callback(goals);
        }).catch(function(error){
            console.log(error);
            callback(goals);
        })
    };    

    const saveActivity = (user, activity, qty, actDate) => {
        const db = firebase.firestore();
        
        var record = {
            user: user,
            ts: actDate || new Date(),
            activity: activity,
            qty: qty
        };
        return db.collection("activity").add(record);
    };

    const saveTarget = (user, activity, target, unit) => {
        const db = firebase.firestore();
        var record = {
            user: user,
            lastModified: new Date(),
            startDate: new Date(),
            goal: activity,
            target: target,
            unit: unit,
            achieved: 0
        };
        return db.collection("targets").add(record);
    };

    const updateTarget = (target, amount) => {
        const db = firebase.firestore();
        const id = target.id;
        target.achieved = Number((target.achieved? target.achieved: 0)) + Number(amount);
        target.lastModified = new Date();
        return db.collection("targets").doc(id).set(target);
    }
    
    return {
        fetchGoals: fetchGoals,
        fetchTargets: fetchTargets,
        saveActivity: saveActivity,
        saveTarget: saveTarget,
        firebaseInit:firebaseInit,
        getGoals: getGoals,
        getTargets: getTargets,
        getUser: getUser,
        setUser: setUser,
        updateTarget: updateTarget
    }
}
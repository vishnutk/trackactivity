import * as firebase from 'firebase'

export default class DB {
    private static instance: DB;

    private user = null;
    private targets = null;
    private goals = null;
    private static firebaseProject = {};

    constructor() {
    }

    private static firebaseInit = () => {
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
            DB.firebaseProject = firebase.initializeApp(firebaseConfig);
        }
    }

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.firebaseInit();
            DB.instance = new DB();
        }

        return DB.instance;
    }

    private getGoals = (callback: any) => {
        if (this.goals) {
            callback(this.goals);
        } else {
            this.fetchGoals(callback);
        }
    };

    private getUser = () => {
        return this.user;
    };

    public setUser = (u: any) => {
        this.user = u;
    }

    private getTargets = (callback: any) => {
        if (this.targets) {
            callback(this.targets);
        } else {
            this.fetchTargets(callback, this.user);
        }
    };

    private fetchGoals = (callback: any) => {
        var db = firebase.firestore();
        let goals: any[] = [];
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

    private fetchTargets = (callback: any, user: any) => {
        let goals: any[] = [];
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

    private saveActivity = (user: any, activity: any, qty: number, actDate: Date) => {
        const db = firebase.firestore();

        var record = {
            user: user,
            ts: actDate || new Date(),
            activity: activity,
            qty: qty
        };
        return db.collection("activity").add(record);
    };

    private saveTarget = (user: any, activity: any, target: any, unit: any) => {
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

    private updateTarget = (target: any, amount: number) => {
        const db = firebase.firestore();
        const id = target.id;
        target.achieved = Number((target.achieved? target.achieved: 0)) + Number(amount);
        target.lastModified = new Date();
        return db.collection("targets").doc(id).set(target);
    }
}

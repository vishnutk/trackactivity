import * as firebase from 'firebase'
import { IGoogleUser } from './Interfaces';

export default class DB {
    private static instance: DB;

    private static user?: IGoogleUser;
    private static targets: any[] = [];
    private static goals? = null;
    private static firebaseProject = {};

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

    public getGoals = (callback: any) => {
        if (DB.goals) {
            callback(DB.goals);
        } else {
            this.fetchGoals(callback);
        }
    };

    public getUser = () => {
        return DB.user;
    };

    public setUser = (u: any) => {
        console.log("in DB.setUser");
        console.log(u);
        DB.user = u;
    }

    public getTargets = (callback: any) => {
        console.log("in getTargets");
        console.log(DB.targets);
        console.log(DB.user);
        if (DB.targets && DB.targets.length > 0) {
            callback(DB.targets);
        } else {
            if (DB.user) {
                this.fetchTargets(callback, DB.user.email);
            } else {
                callback(DB.targets);
            }
        }
    };

    private fetchGoals = (callback: any) => {
        var db = firebase.firestore();
        let goals: any[] = [];
        db.collection("goals").get().then(function(querySnapshot) {
            console.log("Goals:");
            console.log(querySnapshot);
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
        console.log("in fetch targets:" + user);

        db.collection("targets").where('user', '==', user).get().then(function(querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const data = doc.data();
                data.id = doc.id;
                goals.push(data);
            });
            DB.targets = goals;
            callback(goals);
        }).catch(function(error){
            console.log(error);
            callback(goals);
        })
    };

    public saveActivity = (user: string, activity: string, qty: number, actDate: Date) => {
        const db = firebase.firestore();

        var record = {
            user: user,
            ts: actDate || new Date(),
            activity: activity,
            qty: qty
        };
        console.log("in save activity");
        console.log(record);
        return db.collection("activity").add(record);
    };

    public saveTarget = (user: any, activity: any, target: any, unit: any) => {
        console.log("in save target");
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
        console.log(record);
        return db.collection("targets").add(record);
    };

    public updateTarget = (target: any, amount: number) => {
        const db = firebase.firestore();
        const id = target.id;
        target.achieved = Number((target.achieved? target.achieved: 0)) + Number(amount);
        target.lastModified = new Date();
        return db.collection("targets").doc(id).set(target);
    }
}

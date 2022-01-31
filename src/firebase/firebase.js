import { initializeApp, getApps } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if (!getApps().length) {
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore();
            this.auth = getAuth(app);
        }
    }

    async register(name, email, password) {
        await createUserWithEmailAndPassword(this.auth, email, password);
        await updateProfile(this.auth.currentUser, {
            displayName: name,
        });
    }

    async login(email, password) {
        await signInWithEmailAndPassword(this.auth, email, password);
    }

    async logout() {
        await signOut(this.auth);
    }

    async createData(data, uid) {
        await addDoc(collection(this.db, "animals"), data);
    }
    async getData(uid) {
        const q = query(collection(this.db, "animals"), where("uid", "==", uid));
        var list = [];
        const colle = await getDocs(q);
        colle.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            list.push({ id, data });
        });
        return list;
    }
    async getDataQ(name, value,uid) {
        var list = [];
        console.log(name, value);
        const q = query(collection(this.db, "animals"), where(name, "==", value), where("uid", "==", uid));
        const colle = await getDocs(q);
        colle.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            list.push({ id, data });
        });
        return list;
    }
}

const firebase = new Firebase();
export default firebase;

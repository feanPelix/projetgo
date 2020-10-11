import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBiI7HcJu3VP7bwNuZAyPqHIyoIj2EezAE",
    authDomain: "fir-react-upload-a9e8c.firebaseapp.com",
    databaseURL: "https://fir-react-upload-a9e8c.firebaseio.com",
    projectId: "fir-react-upload-a9e8c",
    storageBucket: "fir-react-upload-a9e8c.appspot.com",
    messagingSenderId: "1008759375839",
    appId: "1:1008759375839:web:4e0dd6f68f3f8fce02266a",
    measurementId: "G-LCZFEBTZ25"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
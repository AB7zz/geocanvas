import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const provider = new GoogleAuthProvider();

const StateContext = React.createContext()

const firebaseConfig = {
  apiKey: "AIzaSyCvED-PkJIQ225tT4n81MAwYMOwSNKF5vU",
  authDomain: "geocanvas-d975a.firebaseapp.com",
  projectId: "geocanvas-d975a",
  storageBucket: "geocanvas-d975a.appspot.com",
  messagingSenderId: "901825547526",
  appId: "1:901825547526:web:7d96b97388b25ceccee287",
  measurementId: "G-SGH4JW05MX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage()

export const StateContextProvider = ({ children }) => {

    const [mapid, setMapid] = React.useState('')
    const [userDetails, setUserDetails] = React.useState({})
    const [searchLoc, setSearchLoc] = React.useState('')
    
    // 0 - not logged in
    // 1 - logging in
    // 2 - logged in
    const [loginState, setLoginState] = React.useState(0)
    const [imageData, setImageData] = React.useState([
        {
          position: [51.505, -0.09],
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT301-O44d0zGakxaUb_Z5leHAtWRQddBpgkWPuqE2Oyw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQka_16bh1cyRU3QvjdKELYHLDB9aRw_AI5XYRURbebmNKtIeyLDpcQ5yw_wpBCaI_PVeU&usqp=CAU"
          ]
        },
        {
          position: [52.505, -0.09],
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT301-O44d0zGakxaUb_Z5leHAtWRQddBpgkWPuqE2Oyw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQka_16bh1cyRU3QvjdKELYHLDB9aRw_AI5XYRURbebmNKtIeyLDpcQ5yw_wpBCaI_PVeU&usqp=CAU"
          ]
        }
    ])

    const fetchPersonalDetails = async() => {
      const token = localStorage.getItem('token');
      let userData = {}
      if (token) {
        const user = await new Promise((resolve) => {
          onAuthStateChanged(auth, (user) => {
              resolve(user);
          });
        });
        if (user) {
            userData = user;
        }else{
            localStorage.removeItem('token');
            userData = null
            setUserDetails(null);
        }
      }
      if(userData){
        const usersRef = collection(db, "users");
        const docRef = doc(usersRef, userData.email);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            userData = { ...userData, ...docSnap.data() }
            setUserDetails(userData)
        } else {
            console.log("Document with email does not exist")
        }
        return true;
      }else{
        return false
      }
    }

    const handleLogin = () => {
      setLoginState(1)
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          localStorage.setItem('token', token)
          localStorage.setItem('login', true)
          initCreateDoc(user.email, user.displayName)
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      }
      
    const initCreateDoc = async(email, displayName) => {
      const usersRef = collection(db, "users");
      
      const docRef = doc(usersRef, email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document with email already exists")
        window.location.replace('/map')
      } else {
        await setDoc(docRef, {
            displayName,
            email,
            public: true
        });
        setLoginState(2);
        window.location.replace('/username')
      }
    }

    const handleCreateUsername = (username) => {
      console.log(username, userDetails.email)
      const usersRef = collection(db, "users");
      const docRef = doc(usersRef, userDetails.email);
      updateDoc(docRef, {
        username
      }).then(() => {
        localStorage.setItem('username', username)
        window.location.replace('/map')
      })
    }

    const handleUploadImage = (location, image) => {
      const storageRef = ref(storage, `${userDetails.email}/some-child`)
      uploadBytes(storageRef, image).then(async(snapshot) => {
        const imageUrl = await getDownloadURL(snapshot.ref)
        
        const usersRef = collection(db, "images");
        const docRef = doc(usersRef, userDetails.email);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const existingData = docSnap.data().data
          const newData = {
            location,
            lat: 0,
            lng: 0,
            images: [imageUrl]
          }
          existingData.push(newData)
          await setDoc(docRef, {data: existingData});
        } else {
          await setDoc(docRef, {
            data: [
              {
                location,
                lat: 0,
                lng: 0,
                images: [imageUrl]
              }
            ]
          }
          )
        }
        console.log('Uploaded everything');
      });
    }

    return (
        <StateContext.Provider value={{
            setMapid,
            setImageData,
            handleLogin,
            fetchPersonalDetails,
            setSearchLoc,
            handleUploadImage,
            handleCreateUsername,
            searchLoc,
            loginState,
            mapid,
            imageData,
            userDetails
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)
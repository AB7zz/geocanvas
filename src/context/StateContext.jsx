import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";
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
    const [profileDetails, setProfileDetails] = React.useState({})
    const [profileImages, setProfileImages] = React.useState([])
    const [searchLoc, setSearchLoc] = React.useState('')
    
    // 0 - not logged in
    // 1 - logging in
    // 2 - logged in
    const [loginState, setLoginState] = React.useState(0)

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
            setProfileDetails(null);
        }
        if(userData){
          const usersRef = collection(db, "users");
          const docRef = doc(usersRef, userData.email);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
              userData = { ...userData, ...docSnap.data() }
              fetchUserImages(userData.email)
              setProfileDetails(userData)
              return true;
          } else {
              console.log("Document with email does not exist")
              return false
          }
        }else{
          return false
        }
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

    const Logout = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('login');
          localStorage.removeItem('username');
          setProfileDetails(null);
          return true
        })
        .catch((error) => {
          console.error("Error logging out:", error);
          return false
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
      console.log(username, profileDetails.email)
      const usersRef = collection(db, "users");
      const docRef = doc(usersRef, profileDetails.email);
      updateDoc(docRef, {
        username
      })
      
      const usernameEmailRef = collection(db, "user-email")
      const docRef2 = doc(usernameEmailRef, username);
      setDoc(docRef2, {
        email: profileDetails.email
      }).then(() => {
        localStorage.setItem('username', username)
        window.location.replace('/map')
      })
    }

    const fetchUserDetails = async(username) => {
      const usernameEmailRef = collection(db, "user-email")
      const docRef = doc(usernameEmailRef, username)
      const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const email = docSnap.data().email
          const usersRef = collection(db, "users");
          const docRef2 = doc(usersRef, email);
          const docSnap2 = await getDoc(docRef2)
          if (docSnap2.exists()) {
            setProfileDetails(docSnap2.data())
            fetchUserImages(email)
          } else {
            console.log("Document with email does not exist")
          }
        }else{
          console.log('no user found')
        }
    }

    const fetchUserImages = async(email) => {
      const usersRef = collection(db, "images");
      const docRef = doc(usersRef, email);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data().data)
        setProfileImages(docSnap.data().data)
      } else {
        console.log("Document with email does not exist")
        setProfileImages(null)
      }
    }

    const uploadImage = async(location, images) => {
      let imageUrls = []
      const imageUploadPromises = images.map(async (image) => {
        const storageRef = ref(storage, `${profileDetails.email}/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl);
      })

      await Promise.all(imageUploadPromises)

      const usersRef = collection(db, "images");
      const docRef = doc(usersRef, profileDetails.email);
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const existingData = docSnap.data().data
        const newData = {
          location,
          lat: 0,
          lng: 0,
          images: imageUrls
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
              images: imageUrls
            }
          ]
        })
      }
      return true
    }

    return (
        <StateContext.Provider value={{
            setMapid,
            handleLogin,
            fetchPersonalDetails,
            setSearchLoc,
            uploadImage,
            handleCreateUsername,
            fetchUserDetails,
            Logout,
            profileImages,
            searchLoc,
            loginState,
            mapid,
            profileDetails
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)
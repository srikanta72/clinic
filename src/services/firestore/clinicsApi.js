import { clinics } from "../../constants/db/clinics";
import { addDoc, collection, deleteDoc, doc, endAt, getDoc, getDocs, orderBy, query, setDoc, startAt, updateDoc } from "firebase/firestore";
import { COLLECTION_CLINICS } from "../../constants/config";
import { db } from "../../firebase";
import {
   geohashForLocation,
   geohashQueryBounds,
   distanceBetween
} from "geofire-common";

export const getClinics = async (filterValue) => {

   if (filterValue && Object.keys(filterValue).length) {
      clinics.filter((item) => {
         if (item['zip'] === filterValue['zip'])
            return item;
         return false
      })
   } else {

      return clinics;
   }
}
export const addAClinic = async (data) => {
   const {
      id,   //id: id,
      // title,   //title: 'MKCG',
      // description,   //description: 'No 1 Hospital in Ganjam',
      // imageUrl,   //imageUrl: 'https://www.mkcgmch.org/images/logo.png',
      // rating,  //rating: 4.1,
      // gmapUrl, //gmapUrl: 'https://goo.gl/maps/KYucT7VYAaQNmLjP7',
      // phoneNumber,   //phoneNumber: '0680 229 2746',
      // country, //country: 'countries/IN',
      // stateUT, //stateUT: 'countries/IN/stateUT/OD',
      // distCity,   //distCity: 'Ganjam',
      // area, //area: 'Brahmapur',
      // localArea,  //localArea: 'MKCG',
      // pin,  //pin: '',
      lat,  //lat: 19.31,
      lng,  //lon: 84.80,
      latLng

   } = data;
   const geohash = geohashForLocation([lat || latLng[0], lng || latLng[1]]);
   data.geohash = geohash;
   data.lat = latLng[0];
   data.lng = latLng[1];


   if (id) {
      try {
         const docRef = await setDoc(doc(db, COLLECTION_CLINICS, id), data)
         console.log("Document written with ID: ", docRef.id);
      } catch (e) {
         console.error("Error adding document: ", e);
      }
   } else {
      try {
         const docRef = await addDoc(collection(db, COLLECTION_CLINICS), data);
         console.log("Document written with ID: ", docRef.id);
      } catch (e) {
         console.error("Error adding document: ", e);
      }

   }
}
export const getAClinic = async (id) => {
   try {
      const docSnap = await getDoc(doc(db, COLLECTION_CLINICS, id));
      if (docSnap.exists())
         console.log("Document written with ID: ", docSnap.data());
      else
         console.log('No such Document');
   } catch (e) {
      console.error("Error adding document: ", e);
   }
}
export const updateAClinic = async (data) => {
   const {
      id,   //id: id,
      // title,   //title: 'MKCG',
      // description,   //description: 'No 1 Hospital in Ganjam',
      // imageUrl,   //imageUrl: 'https://www.mkcgmch.org/images/logo.png',
      // rating,  //rating: 4.1,
      // gmapUrl, //gmapUrl: 'https://goo.gl/maps/KYucT7VYAaQNmLjP7',
      // phoneNumber,   //phoneNumber: '0680 229 2746',
      // country, //country: 'countries/IN',
      // stateUT, //stateUT: 'countries/IN/stateUT/OD',
      // distCity,   //distCity: 'Ganjam',
      // area, //area: 'Brahmapur',
      // localArea,  //localArea: 'MKCG',
      // pin,  //pin: '',
      lat,  //lat: 19.31,
      lng,  //lon: 84.80,

   } = data;
   const geohash = geohashForLocation([lat, lng]);
   data.geohash = geohash;


   if (id) {
      try {
         const docRef = await updateDoc(doc(db, COLLECTION_CLINICS, id), data);
         console.log("Document written with ID: ", docRef.id);
      } catch (e) {
         console.error("Error adding document: ", e);
      }
   } else {
      console.log('id is required to update existing doc');
   }
}
export const deleteAClinic = async (id) => {
   try {
      const ref = doc(db, COLLECTION_CLINICS, id)
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
         console.log("Document with Data: ", docSnap.data());
         await deleteDoc(ref)
         console.log('Deleted succesfully')
      }
      else {
         console.log('No such Document');
      }
   } catch (e) {
      console.error("Error adding document: ", e);
   }
}
export const getAllClinics = async () => {
   const clinicsCollection = [];
   const clinicsFromDB = await getDocs(collection(db, COLLECTION_CLINICS));
   clinicsFromDB.forEach(doc => {
      clinicsCollection.push(doc.data())
      // console.log('each Clinic: ', doc)
   })
   // console.log('clinicsCollection: ', clinicsCollection);
   return clinicsCollection;
}
export const getNearestClinics = async (latt, long) => {
   // Find cities within 50km of London
   const center = [latt || 51.5074, long || 0.1278];
   const radiusInKm = 5;
   const radiusInM = radiusInKm * 1000;

   // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
   // a separate query for each pair. There can be up to 9 pairs of bounds
   // depending on overlap, but in most cases there are 4.
   const bounds = geohashQueryBounds(center, radiusInM);
   const matchingDocs = [];
   for (const b of bounds) {
      console.log('bounds: ', bounds)
      const q = query(collection(db, COLLECTION_CLINICS), orderBy('geohash'), startAt(b[0]), endAt(b[1]))
      getDocs(q).then((querySnapshot) => {
         // console.log('querySnapshot: ', querySnapshot)
         querySnapshot.forEach((doc) => {
            // console.log('querySnapshot doc: ', doc.data())
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " -> ", doc.data());
            const docu = doc.data();
            const lat = docu.lat;
            const lng = docu.lng;

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
               matchingDocs.push(docu);
            }
         });
      });
   }
   return matchingDocs;
}
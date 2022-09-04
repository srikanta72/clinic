import { Grid } from '@mui/material';
import CardView from '../shared/CardView';
import { addAClinic, getAllClinics } from '../../services/firestore/clinicsApi';
import { useEffect, useState } from 'react';

// function distance(lat1, lon1, lat2, lon2, unit) {
//     var radlat1 = Math.PI * lat1 / 180
//     var radlat2 = Math.PI * lat2 / 180
//     var theta = lon1 - lon2
//     var radtheta = Math.PI * theta / 180
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//         dist = 1;
//     }
//     dist = Math.acos(dist)
//     dist = dist * 180 / Math.PI
//     dist = dist * 60 * 1.1515
//     if (unit === "K") { dist = dist * 1.609344 }
//     if (unit === "N") { dist = dist * 0.8684 }
//     console.log('dist: ', dist)
//     return dist
// }

export const ClinicsList = () => {
    const [nearestClinics, setNearestClinics] = useState([]);
    useEffect(() => {
        getAllClinics().then((clinicList) => {
            // console.log('data: ', data)
            setNearestClinics(clinicList)
        })
        // getNearestClinics(19.31, 84.8).then((data3) => {
        //     console.log('data3: ', data3)
        // })
        // console.log('nearestClinics: ', nearestClinics);
    }, [])


//     addAClinic(
//         {
//             id: '30',
//             type: 'Hospital',
//             title: 'Enhance Hairtech Clinic',
//             description: `
// Hair Transplant Clinic In Bhubaneswar
//  Plot No. A/154, s road, beside Kalyan Jeweller, Saheed Nagar, Bhubaneswar, Odisha 751007
//             `,
//             imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPYZMNimd059YdudSubLCwha41K0NxdfuNX3vY=s1160-k-no',
//             rating: 4.7,
//             gmapUrl: 'https://g.page/hairtechodisha?share',
//             phoneNumber: '09040030703',
//             country: 'India',
//             stateUT: 'Odisha',
//             distCity: 'Khordha',
//             area: 'Bhubaneswar',
//             localArea: 'Saheed Nagar',
//    //         lat:20.300881409600542, 
//    //         lng:85.80088439330241,
//              latLng:[20.30123021308103, 85.8433052298074]
//         },
//     )


    // navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //     const poslat = position.coords.latitude;
    //     const poslng = position.coords.longitude;
    //     const filterredList= [];
    //     for (var i = 0; i < nearestClinics.length; i++) {
    //         // if this location is within 0.1KM of the user, add it to the list
    //         if (distance(poslat, poslng, nearestClinics[i].lattitude, nearestClinics[i].longitude, "K") <= 1.5) {
    //             console.log('nearestClinics[i]: ', nearestClinics[i])
    //             // nearestClinics.push(clinics[i]);
    //             filterredList.push(nearestClinics.splice(i, 1))
    //         }
    //     }
    //     setNearestClinics(filterredList);
    //     // nearestClinics = nearestClinics.length ? nearestClinics : clinics;
    //     console.log('nearestClinics: ', nearestClinics)
    // });
    return (
        <div className='my-1'>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {Array.from(nearestClinics).map((element, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index} >
                        <CardView details={element} style={{ height: '100%' }} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
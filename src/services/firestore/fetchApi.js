import { clinics } from "../../constants/db/clinics"


export const getClinics = (filterValue) => {
   if(Object.keys(filterValue).length){
      clinics.filter((item) => {
         if (item['zip'] === filterValue['zip'])
            return item;
         return false
      })
   }else{
      return clinics;
   }
}
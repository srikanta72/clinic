import { Grid } from '@mui/material';
import CardView from '../shared/CardView';
import { getClinics } from '../../services/firestore/fetchApi';

export function ClinicsList(){
    const clinics = getClinics() || [];
    return(
        <div className='my-1'>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {Array.from(clinics).map((element, index) => (
            <Grid item xs={2} sm={4} md={3} key={index} >
              <CardView details={element} style={{ height: '100%' }} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
}
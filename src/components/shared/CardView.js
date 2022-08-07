import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TEXT_MESSAGE_SHARE } from '../../constants/config';
import RadioGroupRating from './RadioGroupRating';

export default function CardView({ details }) {
    const { id, title, description, imageUrl, imageAlt, rating, phoneNumber, whatsAppNumber, telegramNumber, email, gmapUrl } = details;
    return (
        <Card sx={{ maxWidth: 240, height:'100%' }} key={id}>
            <CardActionArea>
                <CardMedia
                style={{objectFit:'contain'}}
                    component="img"
                    height="240"
                    image={imageUrl || 'assets/images/cutezero_sketch_2.jpg'}
                    alt={imageAlt || title || 'Cutezero Image'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h2" component="h2" style={{fontSize:'20px', fontWeight:400}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

            </CardActionArea>
            <CardActions>
                {/* <Button size="small" color="primary">
                    Share
                    </Button> */}
                    <Stack>
                        
                <div style={{width:'100%'}}>
                    <Rating name="read-only" value={rating || 0} precision={0.5} readOnly />
                    <RadioGroupRating deafulRrating={rating || 0} id={id}/>
                </div>
                <div style={{width:'100%'}}>
                {gmapUrl &&
                    <a href={ gmapUrl } target="_blank" rel="noopener noreferrer">
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="locate here"
                        >
                            <LocationOnIcon />
                        </IconButton>
                    </a>
                }
                &nbsp;
                {phoneNumber &&
                    <a href={'tel:' + phoneNumber } target="_blank" rel="noopener noreferrer">
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="call here"
                        >
                            <CallIcon />
                        </IconButton>
                    </a>
                }
                &nbsp;
                {whatsAppNumber &&
                    <a href={'https://wa.me/' + whatsAppNumber + '?text=' + TEXT_MESSAGE_SHARE} target="_blank" rel="noopener noreferrer">
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="message on whatsapp"
                        >
                            <WhatsAppIcon />
                        </IconButton>
                    </a>
                }
                &nbsp;
                {telegramNumber &&
                    <a href={'https://wa.me/' + telegramNumber + '?text=' + TEXT_MESSAGE_SHARE + '&url= http://expense.cutezero.com/tax'} target="_blank" rel="noopener noreferrer">
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="message  on telegram"
                        >
                            <TelegramIcon />
                        </IconButton>
                    </a>
                }
                &nbsp;
                {email && <a href={'mailto:' + email + '?subject=This%20is%20the%20subject&cc=teamcutezero@gmail.com&body=' + TEXT_MESSAGE_SHARE} target="_blank" rel="noopener noreferrer">
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="message  on telegram"
                    >
                        <ForwardToInboxIcon />
                    </IconButton>
                </a>}
                </div>
                    </Stack>
            </CardActions>
        </Card>
    );
}
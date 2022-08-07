import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// import { ANALYTICS_CATEGORY, ANALYTICS_EVENT, sendToAnalytics } from '../../services/analytics/ga';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}
const submitRating = (value, caId) => {
    console.debug('Rating submitted: ', value)
    // sendToAnalytics({ event: ANALYTICS_EVENT.RATE_AND_REVIEW, category: ANALYTICS_CATEGORY.USER , rating: value, caId})
    return customIcons[value].label;
}
IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function RadioGroupRating(props) {
    return (
        <StyledRating
            name="highlight-selected-only"
            defaultValue={props.deafulRrating}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => submitRating(value, props.id)}
            highlightSelectedOnly
        />
    );
}
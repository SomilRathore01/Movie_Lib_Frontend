import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/3421528F5E3679CEA7D89FE51BE6DE6904289364AD148688A2E236A340144BF6/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp'   },
  {
    imgPath:
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/48A5318F985B17F3840FD824F28ACE4C5FF99B4A5C938577D9159EF4BD076EBC/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp'  },
  {
    imgPath:
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B6981BDF339764E6C56626C9DE0820CEF297EAF069F62F244E0F50061219F069/scale?width=1200&aspectRatio=1.78&format=webp'  },
  {
    imgPath:
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1AED6998C4DB33CBF49EE2C76FEB6FB4062CA732F1A58D861D4D05D2E876D8C6/scale?width=1200&aspectRatio=1.78&format=webp'}
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
    <Box sx={{ maxWidth: "60vw", flexGrow: 1, margin: 2, marginLeft:"20vw"}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: "50",
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
              component="img"
                sx={{
                  height: "60vh",
                  borderRadius: "10vh",
                  display: 'block',
                  overflow: 'hidden',
                  width: "60vw",
                }}
                src={step.imgPath}
                />
              ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        style={{height: "2vh", width: "3vw", border:"none", borderRadius:"10vh", background:"beige", marginLeft: "28vw", paddingLeft: "0.5vw", marginTop: "2vh", marginBottom: "5vh"}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
      />
    </Box>
    </>
  );
}

export default SwipeableTextMobileStepper;
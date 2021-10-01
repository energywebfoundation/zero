import { Box, Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router";

export const MainLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography sx={{ m: 3 }} variant="h3" color="#000">Welcome to Main Landing Page!</Typography>
      <Box>
        <Button onClick={() => navigate('/auth/sign-in')} variant="contained" sx={{mx: 3}}>Sign In</Button>
        <Button onClick={() => navigate('/auth/sign-up')} variant="contained">Sign Up</Button>
      </Box>
    </div>
  )
};

export default MainLandingPage;

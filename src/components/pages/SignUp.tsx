import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const SignUp = () => {
  return (
    <center>
      <Paper
        sx={{
          //   margin: "auto",
          width: "30%",
          p: "5%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
        }}
        elevation={10}
      >
        <Typography
          color={"primary"}
          sx={{ mb: "1rem", fontWeight: "100", fontSize: "4rem" }}
        >
          SignUp
        </Typography>
        <TextField
          sx={{ m: "1rem 0" }}
          variant="outlined"
          placeholder="Username"
        />
        <TextField
          sx={{ m: "1rem 0" }}
          variant="outlined"
          placeholder="Password"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" sx={{ m: "1rem 0" }}>
            Sign Up
          </Button>
          {/* <Button variant="contained" sx={{ m: "1rem 0" }}>
            Sign Up
          </Button> */}
          <Button
            sx={{ m: "1rem 0" }}
            // onClick={() => <Link to={"/login"} />}
            autoCapitalize={"false"}
          >
            <Link style={{ textDecoration: "none" }} to={"/login"}>
              Already Signed up? Sign in
            </Link>
          </Button>
        </Box>
        {/* <Button>Sign In</Button> */}
      </Paper>
    </center>
  );
};

export default SignUp;

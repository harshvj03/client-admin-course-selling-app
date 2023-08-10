import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, tokenState } from "../../feature/atom";
import { ADMIN_URL } from "../../constant/constant";

type LoginFieldProps = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const initialLoginState = {
    username: "",
    password: "",
  };
  const [loginField, setLoginField] =
    useState<LoginFieldProps>(initialLoginState);
  // const [token, setToken] = useState<string>();

  const handleChange = (e: any) => {
    setLoginField({
      ...loginField,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    if (loginField.username !== "" && loginField.password !== "") {
      console.log(loginField);
      postData();

      navigate("/");
    } else {
      alert("username or password invalid");
    }
  };

  console.log(token);

  const postData = async () => {
    const res = await axios.post(
      ADMIN_URL + "/login",
      {},
      {
        headers: { ...loginField },
      }
    );

    const { token } = res.data;
    if (token) {
      setIsLoggedIn(true);
    }
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    console.log(res);
  };
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
          Login
        </Typography>
        <TextField
          sx={{ m: "1rem 0" }}
          variant="outlined"
          placeholder="Username"
          value={loginField?.username}
          name="username"
          onChange={handleChange}
        />
        <TextField
          sx={{ m: "1rem 0" }}
          variant="outlined"
          placeholder="Password"
          value={loginField?.password}
          name="password"
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" sx={{ m: "1rem 0" }} onClick={login}>
            Sign In
          </Button>
          <Button variant="contained" sx={{ m: "1rem 0" }}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/sign-up"}
            >
              Sign Up
            </Link>
          </Button>
          <Button sx={{ m: "1rem 0" }}>Forgot Password</Button>
        </Box>
        {/* <Button>Sign In</Button> */}
      </Paper>
    </center>
  );
};

export default Login;

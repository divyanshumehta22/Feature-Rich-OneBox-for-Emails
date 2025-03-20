import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
export function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSignUp = async () => {
    const { name, number, email, password } = formData;

    if (!name || !email || !password || !number) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      dispatch(registerUser({name:name, email: email, number:number, password: password }));
      alert("SignUp successful!");
      navigate("/sign-in"); // Redirect to SignIn page
    } catch (error) {
      console.error("Error creating user profile:", error);
      alert("Error during sign-up. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: { xs: "100%", sm: "50%", md: "30%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: "90%",
            margin: "10px 0px",
          }}
        >
          <Typography variant="h5" sx={{ margin: "5px 0px" }}>
            SignUp
          </Typography>
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="filled"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="number"
            label="Number"
            name="number"
            variant="filled"
            fullWidth
            value={formData.number}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="filled"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            variant="filled"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box
            sx={{
              margin: "5px 0px",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button type="button" variant="contained" onClick={handleSignUp}>
              SignUp
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            color: "grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "15px" }}>Or</Typography>
          <Typography variant="body2" sx={{ fontSize: "15px" }}>
            Already have an account?{" "}
            <Typography
              variant="span"
              onClick={() => {
                navigate("/sign-in");
              }}
              sx={{ fontSize: "15px", color: "blue", cursor: "pointer" }}
            >
              SignIn
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
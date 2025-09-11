import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import StyledLink from "../../components/StyledLink";
import useAuth from "../../../../hooks/useAuth";
import { useAuthSocketLogin } from "../../../../hooks/socket/useAuthSocketLogin";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  let { setUser } = useAuth();
  let navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const handleLoginSuccess = useCallback(
    (data: any) => {
      if (data["status-code"] === 201) {
        let accessToken = data["access-token"];
        localStorage.setItem("accessToken", accessToken);
        let userData = data["user-info"];
        let { id: userId, username: name, email } = userData;
        console.log({ userId, name, email });
        let cred = { userId, name, email };
        if (cred) {
          // setUser(cred);
        }
        // navigate("/app");
      } else {
        console.log(data);
      }
    },
    [navigate]
  );
  const { loginUser } = useAuthSocketLogin(handleLoginSuccess);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);
    loginUser(data);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ maxWidth: 400, mx: "auto" }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="username"
        control={control}
        errors={errors}
        rules={{ required: "Name is required" }}
        label="Name"
        defaultValue=""
      />

      <Input
        name="password"
        control={control}
        label="Password"
        errors={errors}
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d).+$/,
            message:
              "Password must include at least one uppercase letter and one number",
          },
        }}
      />

      <Box>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <StyledLink to="/authentication/sign-up">Sign Up</StyledLink>
        <StyledLink to="/authentication/reset-password" replace>
          Forgot password?
        </StyledLink>
      </Box>
      {error && (
        <Typography
          sx={{
            color: (theme) => theme.palette.error.main,
            textAlign: "center",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

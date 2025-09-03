import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import StyledLink from "../../components/StyledLink";
import useAuth from "../../../../hooks/useAuth";

type FormData = {
  name: string;
  passWord: number;
};

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  let { login } = useAuth();
  let navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);

    if (login) {
      login({ name: data.name, passWord: String(data.passWord) })
        .then((value) => {
          navigate("/app/chat");
          reset(); // Resets the form to default values (empty here)
        })
        .catch((err) => {
          console.log("false block", err);
          setError(err.message);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
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
        name="name"
        control={control}
        errors={errors}
        rules={{ required: "Name is required" }}
        label="Name"
        defaultValue=""
      />

      <Input
        name="passWord"
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

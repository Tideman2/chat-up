import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../../components/Input";

type FormData = {
  email: string;
  name: string;
};

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);
    reset(); // Resets the form to default values (empty here)
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ maxWidth: 400, mx: "auto", minWidth: 350 }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          p: 2,
          border: "1px dashed grey",
          m: 2,
          height: "fit-content",
          width: "fit-content",
        }}
        alignItems={"center"}
      >
        <Typography textAlign={"center"} variant="body1">
          To reset your password
        </Typography>
        <Typography variant="body1">
          fill in the gmail used to create the account
        </Typography>
      </Box>
      <Input
        name="email"
        control={control}
        label="Email"
        errors={errors}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid email format",
          },
        }}
      />
      <Button variant="contained" type="submit">
        reset
      </Button>
    </Box>
  );
}

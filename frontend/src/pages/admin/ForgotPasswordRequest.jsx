import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../../services/authService.js";
import { emailValidatorPattern } from "../../validators/validators.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Loading from "../../components/ui/Loading.jsx";
import Form from "../../components/ui/Form.jsx";
import InfoMessage from "../../components/ui/InfoMessage.jsx";

export default function ForgotPasswordRequest() {
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () => {
      setSuccessMessage("If an account exists with that email, a reset link has been sent.");
    },
  });

  const onSubmit = (data) => {
    setSuccessMessage(null);
    mutate(data.email);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white racing-sans-one-regular mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        {successMessage ? (
          <div className="space-y-6">
            <InfoMessage>{successMessage}</InfoMessage>
            <div className="text-center">
              <Link to="/admin/login" className="text-purple-500 hover:text-purple-400 font-medium">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: emailValidatorPattern,
                })}
                label="Email"
                placeholder="admin@example.com"
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            {isError && <ErrorMessage>Failed to send reset email. Please try again.</ErrorMessage>}

            <Button disabled={isPending} type="submit">
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>

            {isPending && <Loading />}
            
            <div className="text-center mt-4">
               <Link to="/admin/login" className="text-gray-500 hover:text-white text-sm transition">
                Back to Login
              </Link>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

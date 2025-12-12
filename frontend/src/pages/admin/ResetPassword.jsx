import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../services/authService.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Loading from "../../components/ui/Loading.jsx";
import Form from "../../components/ui/Form.jsx";
import InfoMessage from "../../components/ui/InfoMessage.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ token, newPassword }) => resetPassword(token, newPassword),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/login");
      }, 3000);
    },
  });

  const onSubmit = (data) => {
    if (!token) return;
    mutate({ token, newPassword: data.password });
  };

  if (!token) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
            <ErrorMessage>Invalid or missing reset token.</ErrorMessage>
            <Link to="/admin/login" className="text-purple-500 mt-4 inline-block">Return to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
            New Password
          </h1>
        </div>

        {success ? (
            <div className="text-center">
                <InfoMessage>Password reset successfully! Redirecting to login...</InfoMessage>
            </div>
        ) : (
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Input
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters",
                    },
                })}
                label="New Password"
                placeholder="••••••••"
                />
                {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>

            <div>
                <Input
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => {
                        if (watch('password') != val) {
                            return "Your passwords do not match";
                        }
                    },
                })}
                label="Confirm Password"
                placeholder="••••••••"
                />
                {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
            </div>

            {isError && <ErrorMessage>Failed to reset password. Token may be invalid or expired.</ErrorMessage>}

            <Button disabled={isPending} type="submit">
                {isPending ? "Resetting..." : "Reset Password"}
            </Button>

            {isPending && <Loading />}
            </Form>
        )}
      </div>
    </div>
  );
}

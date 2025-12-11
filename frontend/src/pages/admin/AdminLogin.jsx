import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import { emailValidatorPattern } from "../../validators/validators.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Loading from "../../components/ui/Loading.jsx";
import Form from "../../components/ui/Form.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  //check if user is already logged in
  const { isAuthenticated, setIsAuthenticated, setAccessToken } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (accessToken) => {
      setIsAuthenticated(true);
      setAccessToken(accessToken);
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      setLoginError("Login failed. Please try again.");
    },
  });

  const onSubmit = (data) => {
    setLoginError(null);
    mutate(data);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
            Admin Portal
          </h1>
        </div>

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

          <div>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              label="Password"
              placeholder="••••••••"
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-purple-500 hover:text-purple-400 oswald-400 text-sm transition"
            >
              Forgot password?
            </a>
          </div>

          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

          <Button disabled={isPending} type="submit">
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          {isPending && <Loading />}
        </Form>
      </div>
    </div>
  );
}

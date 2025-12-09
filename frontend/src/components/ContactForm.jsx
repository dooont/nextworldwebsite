import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "../services/inquiriesService.js";
import { emailValidatorPattern } from "../validators/validators.js";
import Form from "./ui/Form.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import ErrorMessage from "./ui/ErrorMessage.jsx";
import Loading from "./ui/Loading.jsx";

export default function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      inquiryBody: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      setSubmitSuccess(true);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto">
        <Form title="Contact Us" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Input
                {...register("firstName", {
                  required: "First name is required",
                })}
                label="First Name"
                placeholder="First Name"
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                label="Last Name"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register("userEmail", {
                required: "Email is required",
                pattern: emailValidatorPattern,
              })}
              label="Email Address"
              placeholder="email@example.com"
            />
            {errors.userEmail && (
              <ErrorMessage>{errors.userEmail.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              {...register("inquiryBody", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              type="textarea"
              rows="6"
              label="Your Message"
              placeholder="Write your message here"
            />
            {errors.inquiryBody && (
              <ErrorMessage>{errors.inquiryBody.message}</ErrorMessage>
            )}
          </div>

          <Button disabled={isPending} type="submit">
            {isPending ? "Sending..." : "Send Message"}
          </Button>

          {isPending && <Loading />}
          {error && (
            <ErrorMessage>
              Could not send inquiry. Please try again later.
            </ErrorMessage>
          )}
          {submitSuccess && (
            <div className="text-purple-800 text-center oswald-400 text-lg mt-4">
              We have recieved your message, and will get back as soon as
              possible!
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}

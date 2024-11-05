import { useState, useEffect } from "react";
import { sendLinkEmail } from "../../api/auth";
import ToastMessage from "../../Components/ToastMessage/ToastMessage"; // Giả sử bạn có một component ToastMessage
import { useFormik } from "formik";
import * as Yup from "yup";
const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false); // Trạng thái cho Toast

  // Ẩn Toast sau 3 giây
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // Ẩn Toast sau 3 giây
      }, 3000);
      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }
  }, [showToast]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await sendLinkEmail(values.email);
        setMessage(res);
        setShowToast(true); // Hiện Toast
      } catch (error) {
        setMessage("Registration failed. Please try again.");
        setShowToast(true);
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      {showToast && <ToastMessage message={message} />}{" "}
      {/* Hiện Toast nếu showToast true */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-[white]">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

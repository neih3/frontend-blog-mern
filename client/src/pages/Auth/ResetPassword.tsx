import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import ToastMessage from "../../Components/ToastMessage/ToastMessage";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false); // Trạng thái cho Toast

  const handleSubmit = async (email: string) => {
    console.log("email:", email);
    const res = await resetPassword(token, email);
    setMessage(res);
    setShowToast(true); // Hiện Toast
  };

  // Ẩn Toast sau 3 giây
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // Ẩn Toast sau 3 giây
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }
  }, [showToast, navigate]);

  return (
    <>
      {showToast && <ToastMessage message={message} />}{" "}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(password);
                }}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

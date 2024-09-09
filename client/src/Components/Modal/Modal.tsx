import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import { cloudinaryUpload } from "../../api/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/auth";

const Modal = ({ open, setOpen, user }: any) => {
  console.log(user);
  const [preAvatar, setPreAvatar] = useState<File | null>();

  const [avatar, setAvatar] = useState(user.avatar || "");

  const [name, setName] = useState<string>(user.name);

  const [bio, setBio] = useState<string>(user.bio || "");

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (user: any) => updateUser(user),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  async function handleSubmit() {
    let updatedAvatar = avatar;

    if (preAvatar) {
      const uploadData = new FormData();
      uploadData.append("image", preAvatar);
      try {
        const res = await cloudinaryUpload(uploadData);
        updatedAvatar = res.data.url; // Cập nhật avatar với URL mới
        setAvatar(updatedAvatar); // Cập nhật state avatar
      } catch (error) {
        console.error("Avatar upload error:", error);
        return; // Ngừng xử lý nếu upload thất bại
      }
    }

    // Sau khi upload thành công, cập nhật thông tin người dùng
    updateUserMutation.mutate({ name, bio, avatar: updatedAvatar });
  }
  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          style={{ background: "rgba(0, 0, 0, 0.6)" }}
          transition
          className="fixed  inset-0  transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
              transition
              className="relative  transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {/* Dialog Header */}
              <div
                className="flex px-4 py-5 text-white justify-between"
                style={{
                  background: "#FFFFFF1A",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <h3>Profile</h3>
                <svg
                  onClick={() => setOpen(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              {/* Dialog Body */}
              <div className="px-4 mt-4">
                <div className="flex items-center ">
                  <label
                    htmlFor=""
                    style={{ color: "#FFFFFFB3" }}
                    className="w-2/5"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    type="text"
                    className="w-full py-3 px-2  outline-none"
                    style={{
                      background: "rgb(21, 21, 21)",
                      color: "white",
                      caretColor: "white",
                    }}
                  />
                </div>
                <div className="flex items-center  mt-4">
                  <label
                    htmlFor=""
                    style={{ color: "#FFFFFFB3" }}
                    className="w-2/5"
                  >
                    Bio
                  </label>
                  <textarea
                    className="w-full py-3 px-2  outline-none"
                    value={bio}
                    onChange={(e) => setBio(e.currentTarget.value)}
                    style={{
                      background: "rgb(21, 21, 21)",
                      color: "white",
                      caretColor: "white",
                    }}
                  />
                </div>

                <div className="flex items-center  mt-4">
                  <label
                    htmlFor=""
                    style={{ color: "#FFFFFFB3" }}
                    className="w-2/5"
                  >
                    Avatar
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setPreAvatar(e.target.files[0]); // Lưu tệp đã chọn vào state
                      }
                    }}
                  />
                </div>
              </div>
              {/* Dialog Footer */}
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleSubmit();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;

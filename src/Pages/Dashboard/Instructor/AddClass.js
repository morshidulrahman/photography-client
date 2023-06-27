import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
const img_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const img_host_url = `https://api.imgbb.com/1/upload?key=${img_token}`;
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const availableSeats = form.seat.value;
    const instructorName = user?.displayName;
    const instructorEmail = user?.email;
    const price = form.price.value;
    const image = selectedImage;

    const formData = new FormData();
    formData.append("image", image);

    fetch(img_host_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imagRes) => {
        if (imagRes.success) {
          const imgURL = imagRes.data.display_url;
          const newClass = {
            name,
            price: parseFloat(price),
            availableSeats: parseFloat(availableSeats),
            instructorName,
            instructorEmail,
            image: imgURL,
            status: "pending",
            numberOfStudents: 0,
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            if (data.data.insertedId) {
              form.reset();
              toast.success("your class added successfully");
            }
          });
        }
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">
          Add a new Class
        </h2>
        <form
          onSubmit={handleSubmit}
          className="border rounded-xl p-10 dark:border-gray-700 border-gray-300"
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Class Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="your class name"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Instructor Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="user"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Instructor Email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder=""
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Available seats
              </label>
              <input
                type="number"
                name="seat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={12}
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={12}
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2.5 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 sm:col-span-2 w-full "
          >
            Add Class
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddClass;

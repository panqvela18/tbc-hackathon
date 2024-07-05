"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  currency: Yup.string().required("ვალუტის არჩევა სავალდებულოა"),
  count: Yup.number()
    .required("რაოდენობა სავალდებულოა")
    .positive("რაოდენობა უნდა იყოს დადებითი")
    .integer("რაოდენობა უნდა იყოს მთელი რიცხვი"),
  type: Yup.string().required("ტიპის არჩევა სავალდებულოა"),
});

export default function AddNewOrder() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values: {
    currency: string;
    count: number;
    type: string;
  }) => {
    console.log("Order submitted:", values);
    handleClose();
  };

  return (
    <section className="px-[5%] mt-10 flex justify-center">
      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300"
      >
        + დაამატე ორდერი
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-[#1a1a2e] text-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
          <h2 className="text-2xl mb-4">დაამატე ორდერი</h2>
          <Formik
            initialValues={{ currency: "", count: 0, type: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="currency"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    ვალუტა
                  </label>
                  <Field
                    as="select"
                    name="currency"
                    id="currency"
                    className="w-full p-2.5 bg-gray-800 border border-gray-600 text-white rounded"
                  >
                    <option value="" disabled>
                      აირჩიე ვალუტა
                    </option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </Field>
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="count"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    რაოდენობა
                  </label>
                  <Field
                    type="number"
                    id="count"
                    name="count"
                    className="w-full p-2.5 bg-gray-800 border border-gray-600 text-white rounded"
                  />
                  <ErrorMessage
                    name="count"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    ტიპი
                  </label>
                  <Field
                    as="select"
                    name="type"
                    id="type"
                    className="w-full p-2.5 bg-gray-800 border border-gray-600 text-white rounded"
                  >
                    <option value="" disabled>
                      აირჩიე ტიპი
                    </option>
                    <option value="buy">ყიდვა</option>
                    <option value="sell">გაყიდვა</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 w-full py-2.5 rounded"
                >
                  დაამატე
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </section>
  );
}

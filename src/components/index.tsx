import { useMutation } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { validateQuery } from "../api";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// ... (previous imports)

export const ValidateLink: React.FC = () => {
  const { mutate, data, isLoading } = useMutation({
    mutationFn: validateQuery,
  });

  const [validationSuccess, setValidationSuccess] = useState(false);

  const handleGoBack = () => {
    setValidationSuccess(false);
  };

  useEffect(() => {
    if (data?.parsed_data) setValidationSuccess(true);
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-full bg-stone-100">
      <div className="max-w-[764px] w-full px-8 mx-auto">
        {validationSuccess && data?.parsed_data ? (
          <div className="max-w-[700px] w-full px-8 py-12 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center rounded-xl mt-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Gym Details</h2>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Name: {data.parsed_data.venue_name}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Address: {data.parsed_data.address}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Zipcode: {data.parsed_data.zip}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Rating: {data.parsed_data.rating_average}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Attributes:{" "}
              {data.parsed_data.attributes.map((item: string) => (
                <span key={item}>{item + "  "}</span>
              ))}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Description: {data.parsed_data.description}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
              Reviews:{" "}
              {data.parsed_data.featured_review.map(
                (item: any, index: number) => (
                  <span key={index}>{item.text + " "}</span>
                )
              )}
            </p>
            <button
              onClick={handleGoBack}
              className="relative bg-blue-500 text-white  py-2 rounded-lg min-w-[180px] text-center min-h-[48px]"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Go Back
            </button>
          </div>
        ) : (
          <div className="max-w-[700px] w-full px-8 py-12 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center rounded-xl mt-4">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Gym Link Validation
            </h1>
            <p className="text-gray-600 mb-4 sm:mb-8 text-center">
              Please enter the link to your gym below for validation:
            </p>
            <Formik
              initialValues={{ yelp_url: "" }}
              onSubmit={(values) => {
                mutate({ yelp_url: values.yelp_url });
                setValidationSuccess(true);
              }}
              validationSchema={Yup.object({
                yelp_url: Yup.string().required("Required"),
              })}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="yelp_url"
                    value={values.yelp_url}
                    className="min-h-[48px] w-full p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Enter your gym link..."
                  />
                  <button
                    type="submit"
                    className="relative bg-blue-500 text-white px-4 py-2 rounded-lg min-w-[180px] text-center min-h-[48px]"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="flex items-center justify-center absolute inset-0">
                        <Oval color="#fff" height={20} width={20} />
                      </div>
                    )}
                    {!isLoading && "Validate"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateLink;

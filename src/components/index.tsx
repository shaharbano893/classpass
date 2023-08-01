import { useMutation } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { validateQuery } from "../api";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import ViewParsedData from "./viewParsedData";
import useValidation from "./completionsHook";

interface ReviewType {
  author: {
    location: string;
    name: string;
  };
  text: string;
}

export const ValidateLink: React.FC = () => {
  const { mutate, data, isLoading, error } = useMutation({
    mutationFn: validateQuery,
  });

  const { relevance, getRelevance } = useValidation();
  const [validationSuccess, setValidationSuccess] = useState(false);

  const handleGoBack = () => {
    setValidationSuccess(false);
    setValidationSuccess(false);
  };

  const getFeaturedReviews = (reviewsArray: Array<ReviewType>) => {
    if (!reviewsArray) return "";
    let reviewTextArr = [];
    for (let i = 0; i < reviewsArray.length; i++) {
      reviewTextArr.push(reviewsArray[i].text);
    }
    return reviewTextArr.join();
  };

  useEffect(() => {
    if (data?.parsed_data) {
      getRelevance(
        data?.parsed_data?.venue_name || "",
        data?.parsed_data?.address || "",
        "",
        data?.parsed_data?.rating_average || "",
        data?.parsed_data?.description || "",
        getFeaturedReviews(data?.parsed_data?.featured_review),
        data?.parsed_data?.zip || ""
      );
      setValidationSuccess(true);
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-full bg-stone-100">
      <div className="max-w-[764px] w-full px-8 mx-auto">
        {validationSuccess && data?.parsed_data ? (
          <ViewParsedData
            handleGoBack={handleGoBack}
            data={data}
            relevance={relevance}
          />
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

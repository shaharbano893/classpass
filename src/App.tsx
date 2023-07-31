import { useMutation } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { validateQuery } from "./api";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const App: React.FC = () => {
  const { mutate, data, isLoading } = useMutation({
    mutationFn: validateQuery,
  });
  return (
    <div className="flex justify-center items-center min-h-full bg-stone-100">
      <div className="max-w-[764px] w-full px-8 mx-auto">
        <div className="max-w-[700px] w-full px-8 py-12 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center rounded-xl">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Gym Link Validation
          </h1>
          <p className="text-gray-600 mb-4 sm:mb-8 text-center">
            Please enter the link to your gym below for validation:
          </p>
          <Formik
            initialValues={{ yelp_url: "" }}
            onSubmit={(values) => mutate({ yelp_url: values.yelp_url })}
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
          {data?.match && (
            <p className="mt-4 mb-0 text-green-600 font-bold">
              Validation result: {data?.match}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

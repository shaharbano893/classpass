import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import useValidation from "./completionsHook";

interface Props {
  data: any;
  handleGoBack: () => void;
}

interface ReviewType {
  author: {
    location: string;
    name: string;
  };
  text: string;
}

export const ViewParsedData: React.FC<Props> = ({ data, handleGoBack }) => {
  const { relevance, getRelevance } = useValidation();

  const getFeaturedReviews = (reviewsArray: Array<ReviewType>) => {
    if (!reviewsArray) return "";
    let reviewTextArr = [];
    for (let i = 0; i < reviewsArray.length; i++) {
      reviewTextArr.push(reviewsArray[i].text);
    }
    return reviewTextArr.join();
  };

  const {
    venue_name,
    address,
    rating_average,
    description,
    featured_review,
    zip,
    attributes,
  } = data?.parsed_data || {};

  useEffect(() => {
    if (data?.parsed_data) {
      getFeaturedReviews(data?.parsed_data?.featured_review);
      console.log("here");
      getRelevance(
        data?.parsed_data?.venue_name || "",
        data?.parsed_data?.address || "",
        "",
        data?.parsed_data?.rating_average || "",
        data?.parsed_data?.description || "",
        getFeaturedReviews(data?.parsed_data?.featured_review),
        data?.parsed_data?.zip || ""
      );
    }
  }, [data]);

  return (
    <div className="max-w-[700px] w-full px-8 py-12 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center rounded-xl mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">{relevance}</h2>
      <h2 className="text-2xl font-bold mb-4 text-center">Gym Details</h2>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Name: {venue_name || "No venue name found"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Address: {address || "Not able to get address"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Zipcode: {zip || "No zip code exit"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Rating: {rating_average || "No rating average found"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Attributes:{" "}
        {attributes.length > 0
          ? attributes.map((item: string) => (
              <span key={item}>{item + "  "}</span>
            ))
          : "No attributes exit"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Description: {description || "No description found"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 text-center font-semibold">
        Reviews:{" "}
        {featured_review.length > 0
          ? getFeaturedReviews(featured_review)
          : "No reviews exit"}
      </p>
      <button
        onClick={handleGoBack}
        className="relative bg-blue-500 text-white  py-2 rounded-lg min-w-[180px] text-center min-h-[48px]"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Go Back
      </button>
    </div>
  );
};

export default ViewParsedData;

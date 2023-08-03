import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: any;
  handleGoBack: () => void;
  relevance: string;
}

interface ReviewType {
  author: {
    location: string;
    name: string;
  };
  text: string;
}

export const ViewParsedData: React.FC<Props> = ({
  data,
  handleGoBack,
  relevance,
}) => {
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

  return (
    <div className="max-w-[700px] w-full px-8 py-12 bg-white rounded-lg shadow-lg flex flex-col rounded">
      <button
        onClick={handleGoBack}
        className="relative bg-transparent text-sm text-black border-0 rounded-none w-fit text-left p-0 mb-4 hover:bg-transparent focus:bg-transparent"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
        Back
      </button>
      <h2 className="text-2xl font-bold mb-8 text-center">
        Gym Details{" "}
        <span className="text-green-600 font-medium"> ({relevance})</span>
      </h2>
      <p className="text-gray-600 mb-2 font-medium text-sm">
        <span className="font-bold text-black">Name: </span>{" "}
        {venue_name || "No venue name found"}
      </p>
      <p className="text-gray-600 mb-2 font-medium text-sm">
        <span className="font-bold text-black">Address: </span>{" "}
        {address || "Not able to get address"}
      </p>
      <p className="text-gray-600 mb-2 font-medium text-sm">
        <span className="font-bold text-black">Zipcode: </span>
        {zip || "No zip code exit"}
      </p>
      <p className="text-gray-600 mb-2 font-medium text-sm">
        <span className="font-bold text-black">Rating: </span>
        {rating_average || "No rating average found"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 font-medium text-sm">
        <span className="font-bold text-black">Attributes: </span>
        {attributes?.length > 0
          ? attributes?.map((item: string) => (
              <span key={item}>{item + "  "}</span>
            ))
          : "No attributes exit"}
      </p>
      <p className="text-gray-600 mb-4 sm:mb-8 font-medium">
        <span className="font-bold text-black">Description: </span>
        {description || "No description found"}
      </p>
      <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2>
      {featured_review?.map((review: any, index: number) => (
        <div className="bg-sky-100 rounded-lg shadow-md p-4 mb-4">
          <p className="text-black font-semibold">{review.author.name}</p>
          <p className="text-black">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewParsedData;

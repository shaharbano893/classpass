import axios from "axios";

const api = axios.create({
  baseURL: "http://18.212.52.4",
});
enum API_URL {
  SEARCH = "/api/parse",
}

type myMutationParams = {
  yelp_url: string;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const validateQuery = async ({ yelp_url }: myMutationParams) => {
  const response = await api.post(
    `${API_URL.SEARCH}`,
    {
      yelp_url,
    },
    config
  );
  return response.data;
};

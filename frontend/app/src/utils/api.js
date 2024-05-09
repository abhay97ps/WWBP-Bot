import axios from "axios";

// Helper function to get cookies by name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL.replace("/v1", ""),
  withCredentials: true, // Ensure credentials are sent with each request
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add CSRF token to each request
api.interceptors.request.use(
  (config) => {
    const token = getCookie("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch CSRF token and update cookie
export async function getCSRFToken() {
  try {
    const response = await api.get("/csrf/");
    const csrfToken = response.data.csrfToken;
    document.cookie = `csrftoken=${csrfToken}; path=/`;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
}

// Function to fetch data using GET method
export async function fetchData(url = "") {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to send data using POST method
export async function postData(url = "", body = {}) {
  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

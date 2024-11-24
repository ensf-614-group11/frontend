class AppAPI {
  static server = "http://localhost:8080/api/"

  static url(route, queryParams = {}) {
    // Append query parameters to the URL if any
    const url = new URL(AppAPI.server + route);
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key])
    );
    console.log(url)
    return url;
  }

  // Method to set default headers (if needed, include Authorization or other headers)
  static getDefaultHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };
  
    // Add Authorization header if a token is present (e.g., from localStorage)
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    return headers;
  }

  // GET method
  static get = async (route, queryParams = {}) => {
    const response = await fetch(AppAPI.url(route, queryParams), {
      headers: AppAPI.getDefaultHeaders(),
    });

    if(!response.ok) {
      throw new Error(`GET request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // POST method
  static post = async (route, data, queryParams = {}, strategyType = "defaultLogin") => {
    queryParams.strategyType = strategyType;

    console.log("Sending POST request with data:", data, "and queryParams:", queryParams);

    // const requestBody = {
    //   ...data,
    //   strategyType: loginStrategy,  // Add strategyType to the request body
    // };
    // console.log("Sending POST request with data:", requestBody);

    const response = await fetch(AppAPI.url(route, queryParams), {
      method: "POST",
      headers: AppAPI.getDefaultHeaders(),
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new Error(`POST request failed: ${response.status} ${response.statusText}`)
    }

    console.log(response)

    return await response.json();
  }

    // Register method for registration endpoint
    static register = async (data, strategyType = "defaultRegistration") => {
      return await AppAPI.post("auth/register", data, {}, strategyType);
    };
}

export default AppAPI;
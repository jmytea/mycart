import "whatwg-fetch";

class Request {
  async request(url, method, data = {}) {
    // 处理参数
    let queryString = "";
    let bodyString = "";

    // get请求的参数
    if (method === "GET") {
      Object.entries(data).forEach(([key, value], index) => {
        queryString += (index === 0 ? "?" : "&") + `${key}=${value}`;
      });
    }else{
      bodyString = JSON.stringify(data);
    }

    // 处理headers
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("TOKEN"),
    });

    const options = {
      method,
      headers,
    };
    if (method !== "GET") {
      options.body = bodyString;
    }

    const response = await fetch(url + queryString, options);
    const result = await response.json();
    return result;
  }
  get(url, data = {}) {
    return this.request(url, "GET", data);
  }
  post(url, data = {}) {
    return this.request(url, "POST", data);
  }
}

export default new Request();

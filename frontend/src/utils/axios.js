import axios from "axios";

const url = "http://localhost:8080";

async function Add(body, path) {
  const response = await axios.post(url + path, body);
  const resBody = await response.data;
  if (!resBody.isOk) {
    return { status: "error", data: resBody.data };
  }
  return { status: "success", data: resBody.data };
}

async function Get(path) {
  const response = await axios.get(url + path);
  const resBody = await response.data;
  if (!resBody.isOk) {
    return { status: "error", data: resBody.data };
  }

  return { status: "success", data: resBody.data };
}

async function Update(body, path) {
  const response = await axios.patch(url + path, body);
  const resBody = await response.data;

  if (!resBody.isOk) {
    return { status: "error", data: resBody.data };
  }

  return { status: "success", data: resBody.data };
}

async function Delete(path) {
  const response = await axios.delete(url + path);
  const resBody = await response.data;

  if (!resBody.isOk) {
    return "error", resBody.data;
  }

  return "success", resBody.data;
}

export default { Add, Get, Update, Delete };

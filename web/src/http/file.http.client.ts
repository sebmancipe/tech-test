import http from ".";
import { Buffer } from "buffer";

const toText = (file: File, username: string, password: string, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/convert-to-text", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Basic " + Buffer.from(username + ":" + password).toString("base64")
    },
    onUploadProgress,
  });
};

const FileHttpClient = {
  toText
};

export default FileHttpClient;
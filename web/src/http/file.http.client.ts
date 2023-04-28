import http from ".";

const toText = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/convert-to-text", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress,
  });
};

const FileHttpClient = {
  toText
};

export default FileHttpClient;
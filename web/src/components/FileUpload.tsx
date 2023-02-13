import { useState } from "react";
import FileHttpClient from "../http/file.http.client";

const NO_PROGRESS = 0;

const FileUpload: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(NO_PROGRESS);
  };

  const upload = () => {
    setProgress(NO_PROGRESS);

    if(!currentFile) return;

    FileHttpClient.toText(currentFile, (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
    }).then((response) => {
        setMessage(response.data.data);
    }).catch((e) => {
        setProgress(NO_PROGRESS);

        if (e.response && e.response.data && e.response.data.error) {
          setMessage(e.response.data.error);
        } else {
          setMessage("We can not process your file currently");
        }

        setCurrentFile(undefined);
    })
  }
  
  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" onChange={selectFile} data-testid="file-uploader"/>
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload to convert
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

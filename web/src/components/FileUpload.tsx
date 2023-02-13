import { useState } from "react";
import FileHttpClient from "../http/file.http.client";

const NO_PROGRESS = 0;

const FileUpload: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [set, changeSet] = useState(false);

  const informationSet = username && password && set;

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;

    setCurrentFile(selectedFiles?.[0]);
    setMessage("");
    setProgress(NO_PROGRESS);
  };

  const upload = () => {
    setProgress(NO_PROGRESS);

    if(!currentFile || !username || !password) return;

    FileHttpClient.toText(currentFile, username, password, (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
    }).then((response) => {
        setMessage(response.data.data);
    }).catch((e) => {
        setProgress(NO_PROGRESS);

        setMessage("We can not process your file currently. Check your username or password or file size.\n Error: " + e.message);

        setCurrentFile(undefined);
    });
  }

  const onSet = () => {
    changeSet(true);  
  }

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const onLogout = () => {
    setUsername(null);
    setPassword(null);
    changeSet(false);
    setMessage('');
    setCurrentFile(undefined);
  }

  const loginSection = (informationSet) ?  
    (<div style={{marginBottom: "50px", marginRight: "25px", display: "flex", justifyContent: "space-evenly"}}>
      Welcome {username}!
      <div>
        <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
      </div>
    </div>) : (
      <div style={{margin: "25px 0 50px"}}>
        Please, set the next values to use the PDF to text service:
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input type="email" className="form-control" id="exampleInputEmail1" data-testid="username-input"  onChange={onUsernameChange}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" data-testid="password-input" onChange={onPasswordChange}/>
      </div>
      <button className="btn btn-primary"  data-testid="set-button" onClick={onSet}>Set</button>
    </div>);

  return (
    <div>
      {loginSection}

      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input 
              type="file" 
              onChange={selectFile} 
              data-testid="file-uploader" 
              disabled={!informationSet} 
              accept="application/pdf" 
              onClick={(e: any) => e.target.value = ''
            }/>
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            data-testid="upload-button"
            disabled={!currentFile || (!username && !password)}
            onClick={upload}
          >
            Upload to convert
          </button>
        </div>
      </div>

      {(!informationSet) && (
        <div className="alert alert-warning mt-3" role="alert">
          You must set an username and password to convert a PDF to text
        </div>
      )}

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

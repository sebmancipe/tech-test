# Latii tech test
Latii code challenge. The current monorepo contains a server and web projects to convert PDF files to text.

<p align="center">
  <img src="docs/latii-tech-test.png" />
</p>

<sub>You can find the model C4 script of the image above [here](docs/project.infrastrure.puml).</sub>

## Overview:

This monorepository contains two projects: `/server` and `/web`. In this document you can find a detailed explanation of the project setup, technologies and available features.

## Index

1. [ Project sample ](#sample)
2. [ Using the app in the cloud ](#using-the-app-in-the-cloud)
3. [ The `/server` ](/server/README.md#server)
4. [ Available endpoints ](/server/README.md#available-endpoints)
5. [ The `/web` ](/web/README.md#web)
6. [ Authentication ](/server/README.md#authentication)
7. [ Security and monitoring ](#security-and-monitoring)
8. [ Data persistence ](/server/REAME.md#data-persistence)
9. [ Improvements ](#improvements)
10. [ Running the app in local ](#running-the-app)
11. [ Testing ](#testing)

### Sample
The project looks and uses like shown in the video:

https://user-images.githubusercontent.com/45525889/218515876-5f0405d9-219b-4d53-bb3a-80eba5f6fc99.mov

1. To use the service, you must set a username and password of an authenticated user. You can check the available credentials [here](/docs/credentials.md)
2. Once both values are written, click the "Set" button
3. Select the "Choose File" button and select the PDF file you want to convert to text
4. Click on the "Upload to convert" button to make the request and get the text in the file

## Using the app in the cloud

The server and web applications are deployed to [render](https://render.com/). You can check and follow the steps from above by entering in https://latii-web.onrender.com/. Is recommended the use of Chrome for correct styles loading. 

If you want to request the server directly, you can do it by pointing to https://latii-server.onrender.com.

Be aware that these are free tier hosts, meaning that there might be some delays in the response of the back-end and front-end.


## Security and monitoring

The execution of malicious code was contemplated in the development of the project, that's why the usage of string parsing and threads manipulation functions like `eval()`, `setTimeout()`, `setInterval()`, `new Function()` was avoided. Other strategies like reviewing the `npm i` output for vulneravilities in third party libraries and the setup of `dependabot` in this repository were set and used. The upload of the file is restricted to MIME types `application/pdf` files by the front and back end sides.

An improve of this feature can be to implement an Static Code Analyzer over the code like Sonar in the CI/CD pipeline.

Talking about DDOs attacks, a way to mitigate the risk of failure can reside in the infrastructure configuration. Enabling and configuring an open source firewall like `suricata` or `snort` can be possible to avoid these attacks by blocking constant IP addresses.

The monitoring of the server using `DataDog` or setting up alerts in cases of extreme RAM and CPU usage, can be useful to realize these kind of behaviours as well.

In cases where the server **must** support a huge amount of requests suddenly, a horizontal scaling feature can be implemented in the service's cloud the server is hosted based on CPU and RAM metrics.

## Improvements

Due the time given for the challenge, some feature were missing but can be implemented to improve the development experience, CI and CD strategies, errors response and security:
- [ ] Linter and formatters for code presentation (using `ESLint` and/or `prettier`) in both projects
- [ ] Usage of documentation built by code like `swagger` for the backend endpoints.
- [ ] Improve the responsiveness of the UI.
- [ ] Set a pipeline validation using GitHub Actions (or any other CI/CD tool) to 1) format and lint the code, 2) execute tests, 3) validate the coverage, 4) generate the documentation.
- [ ] Create a more robust exception strategy using standarized responses and use cases in both, UI and backend.
- [ ] Implement logger middleware using something like `winston`.
- [ ] Setup both applications with `Docker` to avoid environment and dependencies issues whend developing. Furthermore, enables the uploading of the projects in a containerized fashion way.
- [ ] Implement another authorization and authentication process with JSON Web Tokens or OAuth.
- [ ] Implement SonarCloud to check bugs and vulnerabilities in code.

## Running the app in local

For a local execution is required the use of NodeJS v18.12.1 and npm 8.19.2. An OS library is needed to the parsing of files `pdftotext`. The next commands are set to be run on MacOS:

1. Install `pdftotext` at OS level having `brew` installed:
```bash
brew install xpdf
```
<sub> For other operative systems check [here](https://github.com/zetahernandez/pdf-to-text#installation)</sub>

If you do not have `brew` installed, you can download it [here](https://brew.sh/).

2. Starting in this folder, enter in both: `/server` and `/web` folders in separate bash shells.

```bash
cd [server|web]
```

3. Install both projects dependecies using npm (in each shell):
```bash
npm i
```

4. Create a `.env` file in each of both folders with the next content:

For `/server`:
```javascript
NODE_ENV=testing
```

For `/web`:
```javascript
REACT_APP_SERVER_URL=http://localhost:8080
```

5. Build and start the server:
```bash
npm run launch
```

6. Start the front-end:
```bash
npm run start
```

And that't it! You can see the available endpoints to test the server in the next section or use it by using the web page located in http://localhost:3000.
Be aware that you need to login using an authenticated user. Check the list of users available [here](/docs/credentials.md).

## Testing

Both projects have tests to be executed. You can run these tests with `npm run test` inside each project folder and having installed the dependecies of the project with `npm i`.

## Author

Built by Sebastian Mancipe.

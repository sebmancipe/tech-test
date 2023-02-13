### `/web`

The front-end of the challenge is an NodeJS SPA built with TypeScript using ReactJS. The CSS was done using `bootstrap`. The front exposes a form that enables the uploading of a PDF file and sends it to the server (using `axios`) to the processing of it, showing the result in the same page.

ReactJS is well known for single page applications and it's where I'm more used to work in frontend as the way of development is related to POO and reactive programming, so that's why it was chosen. Altough a vanilla JS and HTML project could work, testing and a good development experience (using TypeScript) is way easier to achieve using React and the project setup is pretty straightforward using Create React App.

The frontend is based on components that encapsulates certain sections of the application. In the case of the challenge, was created a `FileUpload` component that draws a form and has the logic to: set a file to upload it, show a loading bar to see the progress of the processing and show the result of the conversion.

The HTTP client that enables the upload of the file is separated from the UI and reactive logic of the components in a `file.http.client` service. The concerns are split so changes in the way the request is done, shouldn't modify UI or its logic.

Testing was done using `jest` at integration level. No snaptshots were used to validate HTML changes even they could be used. The use case of the project allows to mock the HTTP request using `axios-mock-adapter`, however, the usage of a worker that intercepts network calls like `msw` might be needed if the project scales. The use of a coverage threshold was set at 70% of the lines as well.
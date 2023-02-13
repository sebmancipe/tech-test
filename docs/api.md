# Available Endpoints
The next list are the available endpoints for this project with a bash code to execute them. To use them in the console is required the use of `curl`.

<sub>The examples are set based on a MacOS device, so the path syntax to the file might change is using Windows.</sub>

## Application status
Application health check returning a default response for a healthy app. This endpoint is not secured.
```
GET /status
```
Example request:
```bash
$ curl http://localhost:8080/status
```
Example result:
```json
{
    "serviceAvailable": true
}
```

## PDF to text conversion
Converts a PDF file to text. This endpoint **must be accessed using a valid username and password** (you can find the credentials [here](/docs//credentials.md)).
There's a PDF inside `/server/files/file.pdf` for testing purposes.

<sub>Note: The file size limit is 10MB</sub>

```
POST /convert-to-text

Headers:
{
    "Authorization": "Basic encodedInBase64UsernameAndPassword"
}

Body:
{
    "file": File
}
```
Example request:
```bash
$ curl --form file=@/path/to/file.pdf -u "santiago@latii.com:mDqQGJImF5" http://localhost:8080/convert-to-text
```
Example result:
```json
{
    "data": "a dummy text parsed from file.pdf"
}
```
# Available Endpoints
The next list are the available endpoints for this project with a bash code to execute them. To use them in the console is required the use of `curl`.

<sub>The examples are set based on a MacOS device, so the path to the file might change is using Windows.</sub>

## Application status
Application health check returning a default response for a healthy app.
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
    "serviceAvailable": true,
}
```

## PDF to text conversion
Creates an user profile along the location provided and returns the user, profile and location created.
```
POST /convert-to-text


Body:
{
    "file": File
}
```
Example request:
```bash
$ curl --form file=@/path/to/file.pdf http://localhost:8080/convert-to-text
```
Example result:
```json
{
    "data": "a dummy text parsed from file.pdf"
}
```
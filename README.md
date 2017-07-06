# DeTor

[![tor check](http://detor.ambar.cloud/badge)](https://github.com/RD17/DeTor)

:speak_no_evil: A simple REST API to determine whether a request was made from TOR network or not.

DeTor uses [__TorDNSEL__](https://www.torproject.org/projects/tordnsel.html.en) inside, not the static list of TOR exit nodes.


## DeTor API call

```
GET http://detor.ambar.cloud/
```

### Parameters

| Name    | Type      | Description                          | Default value                         |
|---------|-----------|--------------------------------------|--------------------------------------|
| sourceIp| String, optional | <p>IP address the request was made from</p> | <p>Your IP</p> |
| destIp| String, optional | <p>IP address the request was made to (e.g. your web server public IP)</p> | <p>Public IP address of DeTor API</p> |
| destPort| String, optional | <p>Port number the request was made to (e.g. your web server public port)</p> | <p>80</p> |

## Call Example

### The Simple One

Use badge ![tor check](http://detor.ambar.cloud/badge)](https://github.com/RD17/DeTor) `<img src="http://detor.ambar.cloud/badge"/>`, or just open [http://detor.ambar.cloud/](http://detor.ambar.cloud/) in your browser.

### The Right One
Image you have a web service running on `1.2.3.4` public IP address and `8080` port. You register an incoming request to your service from `2.3.4.5` IP address and want to check whether this request is made from TOR network or not.

In this case the call would be:

**CURL**
```
curl -X GET 'http://detor.ambar.cloud/?sourceIp=2.3.4.5&destIp=1.2.3.4&destPort=8080'
```

**Node.js**
```
var request = require("request");

var options = { method: 'GET',
  url: 'http://detor.ambar.cloud/',
  qs: { sourceIp: '2.3.4.5', destIp: '1.2.3.4', destPort: '8080' }
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

#### Success Response

HTTP/1.1 200 

JSON object, fields:

| Name |Type |Description |
|-----|-----|-----|
|sourceIp|String|`sourceIp` parameter value used for request|
|destIp|String|`destIp` parameter value used for request|
|destPort|String|`destPort` parameter value used for request|
|found|Bool|Request with specified parameters was made from TOR network or not|

Example:
```
{
    "sourceIp": "104.200.20.46",
    "destIp": "89.207.89.82",
    "destPort": "8080",
    "found": true
}
```

#### Error Response

HTTP/1.1 500     

JSON object, fields:

| Name |Type |Description |
|-----|-----|-----|
|error|String|Error description|

Example:
```
{
    "error": "Error: Source IP (256.10.10.10) is invalid"
}
```

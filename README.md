# DeTor

A simple REST API to determine whether a request was made from TOR network or not.

DeTor uses __TorDNSEL__ inside, not the static list of TOR exit nodes.


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

### Call Example

Image you have a web service running on `1.2.3.4` public IP address and `8080` port. You register an incoming request to your service from `2.3.4.5` IP address and want to check whether this request is made from TOR net or not.

In this case the call woudld be:



### Success Response

HTTP/1.1 200    

```
{
    "sourceIp": "127.0.0.1",
    "destIp": "89.207.89.82",
    "destPort": "8080",
    "found": false
}
```

### Error Response

HTTP/1.1 500     

```
{
    "error": "Error: Source IP (12321qawdasfdasfs) is invalid"
}
```

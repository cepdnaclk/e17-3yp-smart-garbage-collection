import 'dart:convert';

import 'package:http/http.dart' as http;

class RequestResult {
  bool ok;
  dynamic data;
  RequestResult(this.ok, this.data);
}

const PROTOCOL = "http";
const DOMAIN = "54.178.202.126:4009";
// 192.168.1.11 vi
// 192.168.43.56
Future<RequestResult> http_get(String route, [dynamic data]) async {
  var dataStr = jsonEncode(data);
  var url = Uri.parse("$PROTOCOL://$DOMAIN/$route?data=$dataStr");
  var result = await http.get(url);
  //return result.body;
  return RequestResult(true, jsonDecode(result.body));
}

Future<RequestResult> http_post(String route, [dynamic data]) async {
  var url = Uri.parse("$PROTOCOL://$DOMAIN/$route");
  var dataStr = jsonEncode(data);
  var result = await http
      .post(url, body: dataStr, headers: {"Content-Type": "application/json"});
  //return RequestResult(true,result);
  /*var res;
  if (result.body.isNotEmpty){
    res = jsonDecode(result.body); 
  }*/
  return RequestResult(true, jsonDecode(result.body));
}

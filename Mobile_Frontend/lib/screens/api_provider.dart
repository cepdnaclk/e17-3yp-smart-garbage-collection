import 'package:http/http.dart' as http;

import 'dart:async';

class ApiProvider {

  ApiProvider();

  Future <http.Response> doLogin(String username, String password, String ip) async {
    var _url = Uri.parse("http://$ip:8000/authenticate");

    var body = {
      "collectorusername": username,
      "collectorpassword": password
    };


    return http.post(_url, body: body);
  }
/*
  Future <http.Response> doRegistration(String name, String surname,String email, String password, String ip) async {
    String _url = 'http://$ip:3000/register';

    var body = {
      "name":name,
      "surname":surname,
      "email": email,
      "password": password,
      "isAdmin":"false"
    };





      return http.post(_url, body: body);
  }
*/

}
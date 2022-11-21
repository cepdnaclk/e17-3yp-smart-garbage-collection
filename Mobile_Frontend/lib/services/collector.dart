import 'package:http/http.dart';
import 'dart:convert';

class Collector{
  String collectorId;

  Future<void> getCollector() async {
    Response response = await post(Uri.parse('http://54.178.202.126:4009/api/authenticate'));
    Map data = jsonDecode(response.body);
    collectorId = data['name'];
  }
}
class User {
  User({
    this.collectorusername,
    this.collectorpassword,
  });
  String collectorusername;
  String collectorpassword;
  
  User.fromJson(Map<String, dynamic> json){
    collectorusername = json['collectorusername'];
    collectorpassword = json['collectorpassword'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['collectorusername'] = collectorusername;
    _data['collectorpassword'] = collectorpassword;
    return _data;
  }
}

/*import 'dart:core' as collector;
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class Users {
  final collector.int id;
  final collector.String fname;
  final collector.String lname;
  final collector.String username;
  Users(
      {this.id,
      this.fname,
      this.lname,
      this.username});
}
*/
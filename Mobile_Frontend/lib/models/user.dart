import 'dart:core' as collector;
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

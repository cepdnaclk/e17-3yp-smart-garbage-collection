import 'package:flutter/material.dart';
import 'package:mobile/screens/home/horizontal_table.dart';
import 'package:mobile/screens/home/mainui.dart';
import 'package:mobile/screens/wrapper.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key key}) : super(key: key);

  //get uid => null;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Trashbot',
      theme: ThemeData(
        primaryColor: Color(0xffE7E7DE),
        scaffoldBackgroundColor: Color(0xffE7E7DE),
      ),
      //home: Wrapper(),
      routes:{
        '/' : (context) => Wrapper(),
        '/mainui': (context) => Mainui(),
      }
    );
  }
}

// ignore_for_file: avoid_print

import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/screens/authenticate/authenticate.dart';
import 'package:mobile/screens/home/home.dart';
import 'package:provider/provider.dart';

class Wrapper extends StatelessWidget {
  //const Wrapper({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {

   // final user = Provider.of<Users>(context);
    //print(user);
    //return either home or authenticate
    
    return const Home();
    

  }
}
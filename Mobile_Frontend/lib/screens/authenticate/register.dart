import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/components/header_widget.dart';
import 'package:mobile/screens/authenticate/sign_in.dart';
import 'package:mobile/screens/authenticate/background.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:mobile/components/rounded_btn/rounded_btn.dart';
import 'package:mobile/models/http.dart';
import 'package:http/http.dart' as http;


class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register>{

  bool showSpinner = false;
  // text field state 
  var username = '';
  var password = '';
  var fname= '';
  var lname='';
  String response = '';
  final success = SnackBar(content: Text('Registration succeded!'));
  final error = SnackBar(content: Text('Invalid username or password!'));
  final serverError = SnackBar(content: Text('Can\'t connect to the server!'));

  createUser() async {
    try{
      var result = await http_post("api/Signup", {
        "collectorfname": fname, "collectorlname": lname, "collectorusername": username, "collectorpassword": password
     });
      if (result.ok) {
          ScaffoldMessenger.of(context).showSnackBar(success);
          Navigator.of(context).pushReplacement(
             MaterialPageRoute(builder: (context) => SignIn()));
        } else {
         //print(result.statusCode);
          ScaffoldMessenger.of(context).showSnackBar(error);
        }
    }
    catch (err) {
        //print(err);
        ScaffoldMessenger.of(context).showSnackBar(serverError);
      }
    
    /*if(result.ok)
    { 
      setState(() {
        response = result.data['status'];
      });
    }*/
  }

  @override
  Widget build(BuildContext context) {

    final Shader linearGradient = LinearGradient(
      colors: <Color>[Color(0xff0f3057), Color(0xff008891)],
    ).createShader(new Rect.fromLTWH(0.0, 0.0, 200.0, 70.0));

    double _headerHeight = 120;
    return ModalProgressHUD(
      inAsyncCall: showSpinner,
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        /*appBar: AppBar(
          elevation: 0,
            leading: _goBackButton(context),
          backgroundColor: Color(0xff008891),
        ),*/
        backgroundColor: Color(0xffE7E7DE),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
              height: _headerHeight,
              child: HeaderWidget(_headerHeight, false, Icons.house_rounded), //let's create a common header widget
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
                child: Text('Create Account',
                  style: TextStyle(
                      foreground: new Paint()..shader = linearGradient,
                      fontWeight: FontWeight.w600,
                      fontSize: 28
                  ),),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Text('Please fill the input below.',
                  style: TextStyle(
                      color: Colors.grey[600],
                      fontWeight: FontWeight.w400,
                      fontSize: 14
                  ),),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'First Name',
                      style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16, color: Color(0xff0F3057)),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    TextField(
                      style: (TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400
                      )),
                      keyboardType: TextInputType.name,
                      obscureText: false,
                      cursorColor: Colors.white,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        fillColor: Color(0xfff0F3057),
                        filled: true,
                        prefixIcon: Icon(Icons.person,color: Color(0xffE7E7DE)),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                          borderRadius: BorderRadius.all(Radius.circular(20.0)),
                      ),
                    ),
                      onChanged: (value) {
                        fname = value;
                      },
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'Last Name',
                      style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16, color: Color(0xff0F3057)),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    TextField(
                      style: (TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400
                      )),
                      keyboardType: TextInputType.name,
                      obscureText: false,
                      cursorColor: Colors.white,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        fillColor: Color(0xfff0F3057),
                        filled: true,
                        prefixIcon: Icon(Icons.person,color: Color(0xffE7E7DE)),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                          borderRadius: BorderRadius.all(Radius.circular(20.0)),
                      ),
                    ),
                      onChanged: (value) {
                        lname = value;
                      },
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'Username',
                      style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16, color: Color(0xff0F3057)),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    TextField(
                      style: (TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400
                      )),
                      keyboardType: TextInputType.name,
                      obscureText: false,
                      cursorColor: Colors.white,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        fillColor: Color(0xfff0F3057),
                        filled: true,
                        prefixIcon: Icon(Icons.email,color: Color(0xffE7E7DE)),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                          borderRadius: BorderRadius.all(Radius.circular(20.0)),
                      ),
                    ),
                      onChanged: (value) {
                        username = value;
                      },
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'Password',
                      style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16, color: Color(0xff0F3057)),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    TextField(
                      style: (TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400
                      )),
                      obscureText: true,
                      cursorColor: Colors.white,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        fillColor: Color(0xfff0F3057),
                        filled: true,
                        prefixIcon: Icon(Icons.lock,color: Color(0xffE7E7DE)),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                          borderRadius: BorderRadius.all(Radius.circular(20.0)),
                        ),
                      ),
                      onChanged: (value) {
                        password = value;
                      },
                    ),
                  ],
                ),
              ),
              Padding(
                
                padding: const EdgeInsets.all(8.0),
                child: Center(
                  child: RoundedButton(
                    btnText: 'SIGN UP',
                    color: Color(0xff008891),
                    onPressed: () {
                      print(username);
                      print(password);
                      createUser();
                      print(response);
                      //signup(fname,lname,username,password);
                    },
                  ),
                  //Text(response),
                ),
                //child: Text(response),
              ),
              Text(response),
              SizedBox(
                height: 100,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Already have an account?',
                    style: TextStyle(
                        color: Colors.grey[600],
                        fontWeight: FontWeight.w400
                    ),),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SignIn()));
                    },
                    child: Text('Sign in',
                        style: TextStyle(
                          color: Color(0xff008891),)
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

Widget _goBackButton(BuildContext context) {
  return IconButton(
      icon: Icon(Icons.arrow_back, color: Colors.grey[350]),
      onPressed: () {
        Navigator.of(context).pop(true);
      });
}

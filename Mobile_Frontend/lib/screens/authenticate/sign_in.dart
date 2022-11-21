import 'dart:convert';
// import 'dart:async';
// import 'dart:html';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile/components/header_widget.dart';
import 'package:mobile/components/submitbutton.dart';
import 'package:mobile/models/http.dart';
// import 'package:mobile/screens/api_provider.dart';
import 'package:mobile/screens/authenticate/register.dart';
import 'package:mobile/screens/home/mainui.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/components/rounded_btn/rounded_btn.dart';
import 'package:http/http.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  //final AuthService _auth = AuthService();
  bool showSpinner = false;
  bool hidePassword = true;
  bool isAPIcallProcess = false;
  // text field state
  //String username = '';
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  TextEditingController _username = TextEditingController();
  //String password = '';
  TextEditingController _password = TextEditingController();
  String response = '';
  final success = SnackBar(content: Text('Login succeded!'));
  final error = SnackBar(content: Text('Invalid username or password!'));
  final serverError = SnackBar(content: Text('Can\'t connect to the server!'));
  final storage = FlutterSecureStorage();

  //ApiProvider apiProvider = ApiProvider();
  bool _isLoading = false;
  bool validate = false;

  

  void displayDialog(context, title, text) => showDialog(
        context: context,
        builder: (context) =>
            AlertDialog(title: Text(title), content: Text(text)),
      );
  signIn(String username, String password) async {
    //var url = Uri.parse("http://localhost:8000/Signin");
    Map data = {'collectorusername': username, 'collectorpassword': password};
    var jsonData = null;
    var collectorid;
    //SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    try {
      var response = await post(
          Uri.parse('http://54.178.202.126:4009/api/authenticate'),
          body: data);
      //print(response);
      if (response.statusCode == 200) {
        jsonData = json.decode(response.body);
        SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
        await sharedPreferences.setString('token',jsonData["token"]);
        //await storage.write(key: "token", value: jsonData["token"]);
        //print(jsonData['token']);
        String id = jsonData['name'].toString();
        //print(id);
        setState(() {
          _isLoading = false;
          validate = true;
          //sharedPreferences.setString("token", jsonData['token']);
          ScaffoldMessenger.of(context).showSnackBar(success);
          //Navigator.pushAndRemoveUntil(
              //context,
              //MaterialPageRoute(builder: (context) => Mainui(id.toString())),
              //(Route<dynamic> route) => false);
          Navigator.pushReplacementNamed(context,'/mainui',arguments: {'id': id});
        });
      }
      //print(response.statusCode);
      else {
        ScaffoldMessenger.of(context).showSnackBar(error);
        print(response.body);
        setState(() {
          validate = false;
          _isLoading = false;
        });
      }
      //return response.statusCode;
      // return 200;
    } catch (err) {
      ScaffoldMessenger.of(context).showSnackBar(serverError);
    }
  }

  @override
  Widget build(BuildContext context) {
    double _headerHeight = 90;
    final height = MediaQuery.of(context).size.height;

    final Shader linearGradient = LinearGradient(
      colors: <Color>[Color(0xff0f3057), Color(0xff008891)],
    ).createShader(new Rect.fromLTWH(0.0, 0.0, 200.0, 70.0));

    return ModalProgressHUD(
      inAsyncCall: showSpinner,
      child: SafeArea(
        child: Scaffold(
          resizeToAvoidBottomInset: true,
          backgroundColor: Color(0xffE7E7DE),
          body: SingleChildScrollView(
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: _headerHeight,
                    child: HeaderWidget(
                        _headerHeight,
                        false,
                        Icons
                            .house_rounded), //let's create a common header widget
                  ),
                  Center(
                    child: SizedBox(
                        width: 280,
                        height: 200,
                        child: Image.asset('images/log.png')),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 15, 20, 8),
                    child: Text(
                      'Login',
                      style: TextStyle(
                          foreground: new Paint()..shader = linearGradient,
                          fontWeight: FontWeight.w600,
                          fontSize: 28),
                    ),
                  ),
                  // ignore: prefer_const_constructors
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: Text(
                      'Please sign in to continue.',
                      style: TextStyle(
                          color: Colors.grey[600],
                          fontWeight: FontWeight.w400,
                          fontSize: 13),
                    ),
                  ),

                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: Container(
                      margin: EdgeInsets.symmetric(vertical: 10),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            'Username',
                            style: TextStyle(
                                fontWeight: FontWeight.w400,
                                fontSize: 16,
                                color: Color(0xff0F3057)),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          TextFormField(
                            style: (TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w400)),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Insert an Username!';
                              }
                            },
                            controller: _username,
                            keyboardType: TextInputType.emailAddress,
                            cursorColor: Colors.white,
                            obscureText: false,
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              fillColor: Color(0xfff0F3057),
                              filled: true,
                              //prefixIcon: Image.asset('images/icon_email.png'),
                              prefixIcon:
                                  Icon(Icons.person, color: Color(0xffE7E7DE)),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Color(0xff14DAE2), width: 2.0),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20.0)),
                              ),
                            ),
                            /*onChanged: (value) {
                            _username.text = value;
                          },*/
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Password',
                          style: TextStyle(
                              fontWeight: FontWeight.w400,
                              fontSize: 16,
                              color: Color(0xff0F3057)),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        TextFormField(
                          style: (TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w400)),
                          validator: (value) {
                            if (value.isEmpty) {
                              return 'Insert a Password!';
                            }
                          },
                          controller: _password,
                          obscureText: hidePassword,
                          cursorColor: Colors.white,
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  hidePassword = !hidePassword;
                                });
                              },
                              color: Colors.white,
                              icon: Icon(
                                hidePassword
                                    ? Icons.visibility_off
                                    : Icons.visibility,
                              ),
                            ),
                            border: InputBorder.none,
                            fillColor: Color(0xfff0F3057),
                            filled: true,
                            //prefixIcon: Image.asset('images/icon_lock.png'),
                            prefixIcon:
                                Icon(Icons.lock, color: Color(0xffE7E7DE)),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                  color: Color(0xff14DAE2), width: 2.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20.0)),
                            ),
                          ),
                          /*onChanged: (value) {
                          _password.text = value;
                        },*/
                        ),
                      ],
                    ),
                  ),
                  //SizedBox(height: height * 0.31),
                  //_submitButton(),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Padding(
                      padding: const EdgeInsets.only(right: 25, top: 10),
                      child: RichText(
                        text: TextSpan(
                          style: TextStyle(
                            color: Color(0xff0F3057),
                            fontSize: 14.0,
                          ),
                          children: <TextSpan>[
                            TextSpan(
                              text: 'Forget password ?',
                              style: TextStyle(
                                color: Color(0xff0F3057),
                                decoration: TextDecoration.underline,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = () {
                                  print("ok");
                                },
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Center(
                      child: RoundedButton(
                          btnText: 'LOGIN',
                          color: Color(0xff008891),
                          /*onPressed: () async {
                        // Add login code
                        addUser();
                      },*/
                          onPressed: () {
                            setState(() {
                              _isLoading = true;
                            });
                            signIn(_username.text, _password.text);
                          }),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Don\'t have an account?',
                        style: TextStyle(
                            color: Colors.grey[600],
                            fontWeight: FontWeight.w400),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => Register()));
                        },
                        child: Text('Sign up',
                            style: TextStyle(
                              color: Color(0xff008891),
                            )),
                      )
                    ],
                  )
                ],
              ),
            ),
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

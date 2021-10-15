import 'dart:convert';
import 'dart:async';
import 'dart:html';

import 'package:flutter/material.dart';
import 'package:mobile/components/header_widget.dart';

import 'package:mobile/screens/authenticate/register.dart';
import 'package:mobile/screens/home/mainui.dart';

import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

import 'package:mobile/components/rounded_btn/rounded_btn.dart';
import 'package:http/http.dart' as http;


AlertDialog getAlertDialog(title, content, context) {
  return AlertDialog(
    title: Text("Login failed"),
    content: Text('${content}'),
    actions: <Widget>[
      TextButton(
        child: Text('Close'),
        onPressed: () {
          Navigator.of(context).pop();
        },
      ),
    ],
  );
}

class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginPageState();
}

class _LoginData {
  String email = '';     //******* 
  String password = '';
}

class UserData extends _LoginData {
  String token = '';
  String username = '';
  late int id;

  void addData (Map<String, dynamic> responseMap) {
    this.id = responseMap["id"];
    this.username = responseMap["username"];
    this.token = responseMap["token"];
  }
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  UserData userData = new UserData();
  bool showSpinner = false;

  void submit() {
    if (this._formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      login();
    }
  }

  void login() async {
    //***** 
    final url = Uri.parse('http://192.168.43.34:4000/users/authenticate');  
    await http.post(url, body: {'username': userData.email, 'password': userData.password})
    .then((response) {
      Map<String, dynamic> responseMap = json.decode(response.body);
      if(response.statusCode == 200) {
        userData.addData(responseMap);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Mainui(),),
        );
      }
      else {
        if(responseMap.containsKey("message"))
          showDialog(context: context, builder: (BuildContext context) =>
            getAlertDialog("Login failed", '${responseMap["message"]}', context));
      }
    }).catchError((err) {
      showDialog(context: context, builder: (BuildContext context) =>
        getAlertDialog("Login failed", '${err.toString()}', context));
    });
  }
  @override
  Widget build(BuildContext context) {
    double _headerHeight = 90;

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
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                height: _headerHeight,
                child: HeaderWidget(_headerHeight, false, Icons.house_rounded), //let's create a common header widget
              ),
                Center(
                  child: SizedBox(
                    width: 280,
                    height: 200,
                    child: Image.asset('images/log.png')
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 15, 20, 8),
                  child: Text('Login',
                  style: TextStyle(
                    foreground: new Paint()..shader = linearGradient,
                    fontWeight: FontWeight.w600,
                    fontSize: 28
                  ),
                  ),
                ),
                // ignore: prefer_const_constructors
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                  child: Text('Please sign in to continue.',
                      style: TextStyle(
                      color: Colors.grey[600],
                      fontWeight: FontWeight.w400,
                      fontSize: 13
                      ),
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
                          keyboardType: TextInputType.emailAddress,
                            cursorColor: Colors.white,
                            obscureText: false,
                            decoration: InputDecoration(
                                border: InputBorder.none,
                                fillColor: Color(0xfff0F3057),
                                filled: true,
                            prefixIcon: Image.asset('images/icon_email.png'),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                                borderRadius: BorderRadius.all(Radius.circular(20.0)),
                              ),
                        ),
                          onChanged: (value) {
                            userData.email = value;
                          },
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
                          prefixIcon: Image.asset('images/icon_lock.png'),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Color(0xff14DAE2), width: 2.0),
                            borderRadius: BorderRadius.all(Radius.circular(20.0)),
                          ),
                        ),
                        onChanged: (value) {
                          userData.password = value;
                        },
                      ),
                    ],
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
                        this.submit
                      },*/
                      onPressed: this.submit,
                    ),
                  ),
                ),
                Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Don\'t have an account?',
                    style: TextStyle(
                        color: Colors.grey[600],
                        fontWeight: FontWeight.w400
                    ),),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => Register()));
                    },
                    child: Text('Sign up',
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
      ),
    );

  }
}
/*
class UserPage extends StatefulWidget {
  late UserData userData;
  //UserPage(@required this.userData) : super(key: key);
  @override
  State<StatefulWidget> createState() => new _UserPageState(userData);
}

class _UserPageState extends State<UserPage> {
  UserData userData;
  Map<String, String> headers = new Map();
  List<Widget> posts = [];

  _UserPageState(this.userData);

  @override
  void initState() {
    headers["Authorization"] = 'Bearer ${userData.token}';
    // headers["x-access-token"] = '${userData.username}';
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size;
    // ignore: unnecessary_new
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('User page'),
      ),
      // ignore: unnecessary_new
      body: new SingleChildScrollView(
        // ignore: unnecessary_new
        child: new Column(
          children: [
            FutureBuilder<Map>(
              future: getUserData(), //sets getServerData method as the expected Future
              builder: (context, snapshot) {
                List<Widget> widgetList = [];
                if (snapshot.hasData) { //checks if response returned valid data
                  widgetList = getUserInfo(snapshot.data);
                }
                else if (snapshot.hasError) { //checks if the response threw error
                  widgetList.add(Text("${snapshot.error}"));
                }
                else {
                  widgetList.add(getRowWithText("Id", "${userData.id}"));
                  widgetList.add(getRowWithText("Username", userData.username));
                  widgetList.add(CircularProgressIndicator());
                }
                return Container(
                  height: (screenSize.height-60) * 0.26,
                  color: Colors.blue[500],
                  padding: new EdgeInsets.all(10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children:widgetList
                  ),
                );
              },
            ),
            FutureBuilder<List>(
              future: getServerData(), //sets getServerData method as the expected Future
              builder: (context, snapshot) {
                if (snapshot.hasData) { //checks if response returned valid data
                  return SingleChildScrollView(
                    child: Container(
                      height: (screenSize.height-60) * 0.65,
                      padding: new EdgeInsets.all(20.0),
                      child: getPosts(snapshot.data),
                    ),
                  );
                }
                else if (snapshot.hasError) { //checks if the response threw error
                  return Text("${snapshot.error}");
                }
                return const CircularProgressIndicator();
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget getPosts(List<dynamic> _posts) {
    for(int i=0;i<_posts.length;i++) {
      posts.add(getPostCard(_posts[i]));
    }
    return ListView.separated(
      shrinkWrap:true,
      physics: const AlwaysScrollableScrollPhysics(),
      itemCount: posts.length,
      itemBuilder: (BuildContext context, int index) {
        return posts[index];
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }

  Widget getPostCard(post) {
    return Card(
      color: Colors.teal[300],
      child: ListTile(
        subtitle: Text(post),
      ),
    );
  }

  Widget getTextContainer(text) {
    return Container(
     padding: EdgeInsets.only(left:5, right:5),
     child: Text(text),
   );
  }

  Widget getRowWithText(label, value) {
    return Row(
      children: <Widget>[
        getTextContainer(label),
        getTextContainer(value),
      ],
    );
  }

  List<Widget> getUserInfo(map) {
    return <Widget>[
      Row(
        children: <Widget>[
          Column(
            children: <Widget>[
              Container(
                width:100,
                height:100,
                child: Image.network(map["picture"]["medium"], fit: BoxFit.cover),
              ),
            ],
          ),
          Expanded( child: Container(
            height:100,
            padding: EdgeInsets.only(left: 10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                getRowWithText("Id", '${map["id"]}'),
                getRowWithText("Username", map["username"]),
                getRowWithText("First name", map["name"]["first"]),
                getRowWithText("Last name", map["name"]["last"]),
              ],
            ),
          ),),
        ],
      ),
      getRowWithText("Phone Number", '${map["phone"]}'),
      getRowWithText("Email", map["email"]),
    ];
  }

  Future<Map> getUserData() async {
    Map<String, dynamic> responseMap;
    final url = Uri.parse('http://192.168.43.34:4000/users/getInfo');
    await http.get(url, headers: headers)
      .then((response) {
        responseMap = json.decode(response.body);
        if(response.statusCode == 200) {
          responseMap = responseMap["userdata"];
        }
        else {
          if(responseMap.containsKey("message"))
            throw(Exception(responseMap["message"]));
        }
      })
      .timeout(Duration(seconds:40),onTimeout: () {
        throw(new TimeoutException("fetch from server timed out"));
      })
      .catchError((err) {
        throw(err);
      });
      return responseMap;
  }

  Future<List> getServerData() async {
    final url = Uri.parse('http://192.168.43.34:4000/users/initialPosts');
    Map<String, dynamic> responseMap;
    //var headers;
    await http.get(url, headers: headers)
    .then((response) {
      responseMap = json.decode(response.body);
      if(response.statusCode == 200) {
        if(!responseMap.containsKey("posts"))
          throw(Exception('error while server fetch'));
      }
      else {
        if(responseMap.containsKey("message"))
          throw(Exception('${responseMap["message"]}'));
        else
          throw(Exception('error while server fetch'));
      }
    })
    .timeout(Duration(seconds:40),onTimeout: () {
      throw(new TimeoutException("fetch from server timed out"));
    })
    .catchError((err) {
      throw(err);
    });
    return responseMap["posts"];
  }
}*/

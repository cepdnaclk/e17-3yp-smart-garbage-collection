import 'package:mobile/components/header_widget.dart';
import 'package:mobile/screens/authenticate/background.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/material.dart';
import 'package:mobile/components/rounded_btn/rounded_btn.dart';
import 'package:mobile/screens/authenticate/register.dart';
import 'package:mobile/screens/authenticate/sign_in.dart';
import 'package:mobile/screens/home/horizontal_table.dart';

class Mainui extends StatelessWidget {
  const Mainui({ Key? key }) : super(key: key);
  //const kPrimaryColor = Color(0xFF6F35A5);
//const kPrimaryLightColor = Color(0xFFF1E6FF);
  @override
  Widget build(BuildContext context) {
    double _headerHeight = 410;

    final Shader linearGradient = LinearGradient(
      colors: <Color>[Color(0xff0f3057), Color(0xff008891)],
    ).createShader(new Rect.fromLTWH(0.0, 0.0, 200.0, 70.0));

    Size size = MediaQuery.of(context).size;
    // This size provide us total height and width of our screen
    return Scaffold(
      body: Background(
      child: SingleChildScrollView(
        child: Column(
          
          //backgroundColor: Color(0xff0F3057),
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              height: _headerHeight,
              child: HeaderWidget(_headerHeight, true, Icons.house_rounded), //let's create a common header widget
            ),
            Text(
              "User Profile",
              style: TextStyle(foreground: new Paint()..shader = linearGradient,fontWeight: FontWeight.w800,
                    fontSize: 43),
            ),
            
            
            SizedBox(height: size.height * 0.05),
            RoundedButton(
              btnText: 'REQUESTS',
              color: Color(0xff0F3057),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return HorizontalTable();
                    },
                  ),
                );
              },
            ),
            RoundedButton(
              btnText: 'MAP',
              color: Color(0xff008891),
              //textColor: Colors.black,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignIn();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    ),
    );
  }
}
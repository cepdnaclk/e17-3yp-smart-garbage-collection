import 'package:flutter/material.dart';

class Background extends StatelessWidget {
  final Widget child;

  const Background({Key key, this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      height: size.height,
      width: double.infinity,
      //backgroundColor: Color(0xffE7E7DE),
      child: Stack(
        //backgroundColor: Color(0xff0F3057),
        alignment: Alignment.center,
        children: <Widget>[
          child,
        ],
      ),
    );
  }
}

import 'dart:convert';

import 'package:horizontal_data_table/horizontal_data_table.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:mobile/components/header_widget.dart';
import 'package:mobile/screens/authenticate/sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HorizontalTable extends StatefulWidget {
  
  @override
  HorizontalTableState createState() => HorizontalTableState();
}

class HorizontalTableState extends State<HorizontalTable> {
  
  //final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  var listData = [];
  
  //static const int sortName = 0;
  //static const int sortStatus = 1;
  //bool isAscending = true;
  //int sortType = sortName;
  bool click = true;
  var id;

  final accept = SnackBar(content: Text('Request Accepted'));
  final decline = SnackBar(content: Text('Request Cancelled!'));

  List<bool> selected = <bool>[];
  

  @override
  void initState() {
    super.initState();
    checkLoginStatus();
    getRequestList();
    
  }

  checkLoginStatus() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    if (sharedPreferences.getString("token") == null) {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (BuildContext context) => SignIn()),
          (Route<dynamic> route) => false);
    }
  }

  getRequestList() async {
     
    var requestList;
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    var headers = sharedPreferences.getString("token");
    
    try {
      
      var response = await get(
          //Uri.parse('http://192.168.8.140:8000/api/collector'),
          Uri.parse('http://54.178.202.126:4009/api/collector'),
          headers: {'authorization': 'Bearer $headers',});

      if (response.statusCode == 200) {
        setState(() {
          
          requestList = json.decode(response.body) as List;

          listData = requestList;
        });
      
        return listData;
      }
    } catch (err) {}
  }

  acceptRequest(String id) async {
    Map data = {'request_ID': id};
    //var jsonData = null;

    //SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    try {
      var response = await post(
          Uri.parse('http://54.178.202.126:4009/api/accept'),
          body: data);
      print(response);
      if (response.statusCode == 200) {
        //jsonData = json.decode(response.body);
        //await storage.write(key: "token", value: jsonData["token"]);
        print('ok');
      }
      //print(response.statusCode);
      else {
        print("not");
      }
      //return response.statusCode;
      // return 200;
    } catch (err) {
      print(err);
    }
  }

  declineRequest(String id) async {
    Map data = {'request_ID': id};
    
    //var jsonData = null;

    //SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    try {
      var response = await post(
          Uri.parse('http://54.178.202.126:4009/api/decline'),
          body: data);
      print(response);
      if (response.statusCode == 200) {
        //jsonData = json.decode(response.body);
        //await storage.write(key: "token", value: jsonData["token"]);
        print('ok');
      }
      //print(response.statusCode);
      else {
        print("not");
      }
      //return response.statusCode;
      // return 200;
    } catch (err) {
      print(err);
    }
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xff0f3057),
        title: Text("New Requests"),
      ),
      body: _getBodyWidget(),
    );
  }

  Widget _getBodyWidget() {
    return Container(
      child: HorizontalDataTable(
        leftHandSideColumnWidth: 120,
        rightHandSideColumnWidth: 600,
        isFixedHeader: true,
        headerWidgets: _getTitleWidget(),
        leftSideItemBuilder: _generateFirstColumnRow,
        rightSideItemBuilder: _generateRightHandSideColumnRow,
        itemCount: listData.length,
        rowSeparatorWidget: const Divider(
          color: Colors.black54,
          height: 1.0,
          thickness: 0.0,
        ),
        leftHandSideColBackgroundColor: Color(0xFFFFFFFF),
        rightHandSideColBackgroundColor: Color(0xFFFFFFFF),
      ),
      height: MediaQuery.of(context).size.height,
    );
  }

  List<Widget> _getTitleWidget() {
    return [
      /*
      Container(
        width: 2,
        height: 70,
        color: Colors.white,
      ),*/
      _getTitleItemWidget('Bin Location', 400, Color(0xff008891)),
      Container(
        width: 2,
        height: 56,
        color: Colors.white,
      ),
      _getTitleItemWidget('Time', 100, Color(0xff008891)),
      Container(
        width: 2,
        height: 56,
        color: Colors.white,
      ),
      _getTitleItemWidget('Accept', 100, Color(0xff008891)),
      Container(
        width: 2,
        height: 56,
        color: Colors.white,
      ),
      _getTitleItemWidget('Decline', 100, Color(0xff008891)),
      Container(
        width: 2,
        height: 56,
        color: Colors.white,
      ),
    ];
  }

  Widget _getTitleItemWidget(String label, double width, color) {
    return Container(
      color: color,
      child: Text(label,
          style: TextStyle(
              fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white)),
      width: width,
      height: 60,
      padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
      alignment: Alignment.centerLeft,
    );
  }

  Widget _generateFirstColumnRow(BuildContext context, int index) {
    return Container(
      color: Colors.blueGrey,
      child: Text(
        listData[index]['location'].toString(),
        style: TextStyle(
            fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
      ),
      width: 120,
      height: 52,
      padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
      alignment: Alignment.centerLeft,
    );
  }

  Widget _generateRightHandSideColumnRow(BuildContext context, int index) {
    return Row(
      children: <Widget>[
        Container(
          child: Text(
            listData[index]['time'].toString(),
            style: TextStyle(fontSize: 18),
          ),
          width: 105,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(
          width: 2,
          height: 56,
          color: Colors.blueGrey,
        ),

        /*Container(
          width: 2,
          height: 56,
          color: Colors.blueGrey,
        ),*/
        /*Container(
          child: Row(
            children: <Widget>[
              Icon(user.userInfo[index].status ? Icons.clear : Icons.check,
                  color:
                      user.userInfo[index].status ? Colors.red : Colors.green),
              Text(
                user.userInfo[index].status ? 'absent' : 'present',
                style: TextStyle(fontSize: 18),
              )
            ],
          ),
          width: 100,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(
          width: 2,
          height: 56,
          color: Colors.blueGrey,
        ),*/
        /*Container(
          child: Text(
            listData[index]['fname'],
            style: TextStyle(fontSize: 18),
          ),
          width: 100,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),*/

        Container(
          child: IconButton(
              icon: Icon((click == false &&  listData[index]['request_id'] == id )
                  ? Icons.done
                  : Icons.add_box),
              color: Colors.black,
              highlightColor: Colors.yellow,
              hoverColor: Colors.green,
              onPressed: () {
                acceptRequest(listData[index]['request_id'].toString());
                ScaffoldMessenger.of(context).showSnackBar(accept);
                setState(() {
                  id = listData[index]['request_id'];
                  click = false;
                });
              }),
          width: 100,
          height: 52,
          //padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(
          width: 2,
          height: 56,
          color: Colors.blueGrey,
        ),
        Container(
          child: IconButton(
              icon: Icon(Icons.delete),
              color: Colors.black,
              highlightColor: Colors.yellow,
              hoverColor: Colors.green,
              onPressed: () {
                declineRequest(listData[index]['request_id'].toString());
                ScaffoldMessenger.of(context).showSnackBar(decline);
                setState(() {
                  listData.remove(listData[index]);
                });
              }),
          width: 100,
          height: 52,
          //padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
      ],
    );
  }
}

import 'package:horizontal_data_table/horizontal_data_table.dart';
import 'package:flutter/material.dart';
import 'package:mobile/components/header_widget.dart';
class HorizontalTable extends StatefulWidget {



  @override
  _HorizontalTableState createState() => _HorizontalTableState();
}

class _HorizontalTableState extends State<HorizontalTable> {
  static const int sortName = 0;
  static const int sortStatus = 1;
  bool isAscending = true;
  int sortType = sortName;

  @override
  void initState() {
    user.initData(10);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xff0f3057),
        title: Text("New Requests"),
      ),
     
        
      
      body:  _getBodyWidget(),
    );
  }

  Widget _getBodyWidget() {
    return Container(
      child:  HorizontalDataTable(
        leftHandSideColumnWidth: 120,
        rightHandSideColumnWidth: 600,
        isFixedHeader: true,
        headerWidgets: _getTitleWidget(),
        leftSideItemBuilder: _generateFirstColumnRow,
        rightSideItemBuilder: _generateRightHandSideColumnRow,
        itemCount: user.userInfo.length,
        rowSeparatorWidget: const Divider(
          color: Colors.black54,
          height: 1.0,
          thickness: 0.0,
        ),
        leftHandSideColBackgroundColor: Color(0xFFFFFFFF),
        rightHandSideColBackgroundColor: Color(0xFFFFFFFF),
      ),
      height: MediaQuery
          .of(context)
          .size
          .height,
    );
  }

  List<Widget> _getTitleWidget() {
    return [
      FlatButton(

        padding: EdgeInsets.all(0),
        child: _getTitleItemWidget(
            'Request' + (sortType == sortName ? (isAscending ? '  ↓' : '  ↑') : ''),
            120,Color(0xff008891)),
        onPressed: () {
          sortType = sortName;
          isAscending = !isAscending;
          user.sortName(isAscending);
          setState(() {

          });
        },
      ),
      //Container(width: 2,height: 56,color: Colors.white,),
      //_getTitleItemWidget('Rool No', 100,Colors.red),
      //Container(width: 2,height: 56,color: Colors.white,),
     /* FlatButton(
        padding: EdgeInsets.all(0),
        child: _getTitleItemWidget('Attendance' +
            (sortType == sortStatus ? (isAscending ? '↓' : '↑') : ''), 100,Colors.red),
        onPressed: () {
          sortType = sortStatus;
          isAscending = !isAscending;
          user.sortStatus(isAscending);
          setState(() {

          });
        },
      ),*/
      Container(width: 2,height: 56,color: Colors.white,),
      _getTitleItemWidget('Time', 100,Color(0xff008891)),
     Container(width: 2,height: 56,color: Colors.white,),
      _getTitleItemWidget('Admin ID', 100,Color(0xff008891)),
      Container(width: 2,height: 56,color: Colors.white,),
      _getTitleItemWidget('Accept', 100,Color(0xff008891)),
      Container(width: 2,height: 56,color: Colors.white,),
      _getTitleItemWidget('Decline', 100,Color(0xff008891)),
    ];
  }

  Widget _getTitleItemWidget(String label, double width,color) {
    return Container(
      color: color,
      child: Text(label, style: TextStyle(fontWeight: FontWeight.bold,fontSize: 18,color: Colors.white)),
      width: width,
      height: 56,
      padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
      alignment: Alignment.centerLeft,
    );
  }

  Widget _generateFirstColumnRow(BuildContext context, int index) {
    return Container(
      color: Colors.blueGrey,
      child: Text(user.userInfo[index].name,style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.white),),
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
          child: Text(user.userInfo[index].roll_no,style: TextStyle(fontSize: 18),),
          width: 100,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(width: 2,height: 56,color: Colors.blueGrey,),
        Container(
          child: Row(
            children: <Widget>[
              Icon(
                  user.userInfo[index].status
                      ? Icons.clear
                      : Icons.check,
                  color: user.userInfo[index].status ? Colors.red : Colors
                      .green),
              Text(user.userInfo[index].status ? 'absent' : 'present',style: TextStyle(fontSize: 18),)
            ],
          ),
          width: 100,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(width: 2,height: 56,color: Colors.blueGrey,),
        Container(
          child: Text(user.userInfo[index].start_time,style: TextStyle(fontSize: 18),),
          width: 100,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
        Container(width: 2,height: 56,color: Colors.blueGrey,),
        Container(
          child: Text(user.userInfo[index].end_time,style: TextStyle(fontSize: 18),),
          width: 200,
          height: 52,
          padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
          alignment: Alignment.centerLeft,
        ),
      ],
    );
  }
}

Student user = Student();

class Student {
  // ignore: deprecated_member_use
  List<StudentInfo> _userInfo = <StudentInfo>[];

  void initData(int size) {
    for (int i = 0; i < size; i++) {
      _userInfo.add(StudentInfo(
          "Student_$i", i % 3 == 0, 'St_No $i', '10:00 AM', '12:30 PM'));
    }
  }

  List<StudentInfo> get userInfo => _userInfo;

  set userInfo(List<StudentInfo> value) {
    _userInfo = value;
  }

  ///
  /// Single sort, sort Name's id
  void sortName(bool isAscending) {
    _userInfo.sort((a, b) {
      int? aId = int.tryParse(a.name.replaceFirst('Student_', ''));
      int? bId = int.tryParse(b.name.replaceFirst('Student_', ''));
      return (aId! - bId!) * (isAscending ? 1 : -1);
    });
  }

  ///
  /// sort with Status and Name as the 2nd Sort
  void sortStatus(bool isAscending) {
    _userInfo.sort((a, b) {
      if (a.status == b.status) {
        int? aId = int.tryParse(a.name.replaceFirst('User_', ''));
        int? bId = int.tryParse(b.name.replaceFirst('User_', ''));
        return (aId! - bId!);
      } else if (a.status) {
        return isAscending ? 1 : -1;
      } else {
        return isAscending ? -1 : 1;
      }
    });
  }
}

class StudentInfo {
  String name;
  bool status;
  String roll_no;
  String start_time;
  String end_time;

  StudentInfo(this.name, this.status, this.roll_no, this.start_time,
      this.end_time);
}
 

 
/*import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Request extends StatefulWidget {
  @override
  _RequestState createState() => _RequestState();
}

class _RequestState extends State<Request> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          elevation: 0,
            leading: _goBackButton(context),
          backgroundColor: Color(0xffe7e7de),
        ),
      body: Center(
        child: Container(
          
          height: MediaQuery
              .of(context)
              .size
              .height - 60.0,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  width: MediaQuery
                      .of(context)
                      .size
                      .width - 15.0,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12.0),
                    color: Color(0xff5a348b),
                    gradient: LinearGradient(
                        colors: [Color(0xff0f3057), Color(0xff008891)],
                        begin: Alignment.centerRight,
                        end: Alignment(-1.0, -1.0)
                    ), //Gradient
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          //Text
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Container(
                              child: Text('Requests', style: TextStyle(
                                color: Colors.white,
                                fontSize: 24.0,
                                fontWeight: FontWeight.bold,
                              ),),
                            ),
                          ),
                          
                          //Circle Avatar
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Container(
                                width: 150.0,
                                height: 130.0,
                                decoration: new BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Colors.white,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Container(
                                      child: Text(
                                        '\u00243.99', style: TextStyle(
                                        fontSize: 30.0,
                                        color: Color(0xff8d70fe),
                                        fontWeight: FontWeight.bold,
                                      ),),
                                    ),
                                    Container(
                                      child: Text('/mo', style: TextStyle(
                                        fontSize: 20.0,
                                        color: Color(0xff8d70fe),
                                      ),),),
                                  ],)
                            ),
                          ),
                          //child: SingleChildScrollView(

                          //Two Column Table
                          DataTable(
                        
                            columns: <DataColumn>[
                              DataColumn(
                                label: Text('Request',style: TextStyle(
                                color: Colors.white,
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                              ),),
                              ),
                              DataColumn(
                                label: Text('Time',style: TextStyle(
                                color: Colors.white,
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                              ),),
                              ),
                            ],
                            rows: <DataRow>[
                              DataRow(
                                  cells: <DataCell>[
                                    DataCell(
                                      myRowDataIcon(
                                          FontAwesomeIcons.database, "Databases"),
                                    ),
                                    DataCell(
                                      Text('30GB',
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),),
                                    ),
                                  ]
                              ),
                              DataRow(
                                  cells: <DataCell>[
                                    DataCell(
                                      myRowDataIcon(
                                          FontAwesomeIcons.users,
                                          "FTP users"),
                                    ),
                                    DataCell(
                                      Text('50', style: TextStyle(
                                        color: Colors.white,
                                      ),),
                                    ),
                                  ]
                              ),
                              DataRow(
                                  cells: <DataCell>[
                                    DataCell(
                                      myRowDataIcon(
                                          FontAwesomeIcons.folderOpen,
                                          "Adons Domain"),
                                    ),
                                    DataCell(
                                      Text('5', style: TextStyle(
                                        color: Colors.white,
                                      ),),
                                    ),
                                  ]
                              ),
                              DataRow(
                                  cells: <DataCell>[
                                    DataCell(
                                      myRowDataIcon(
                                          FontAwesomeIcons.phone,
                                          "24/7 Support"),
                                    ),
                                    DataCell(
                                      Text('Yes', style: TextStyle(
                                        color: Colors.white,
                                      ),),
                                    ),
                                  ]
                              ),
                              DataRow(
                                  cells: <DataCell>[
                                    DataCell(
                                      myRowDataIcon(FontAwesomeIcons.envelope,
                                          "Custom Email"),
                                    ),
                                    DataCell(
                                      Text('50', style: TextStyle(
                                        color: Colors.white,
                                      ),),
                                    ),
                                  ]
                              ),
                            ],
                          ),

                          //Button
                          Padding(
                            padding: const EdgeInsets.only(top: 3.0),
                            child: RaisedButton(
                                color: new Color(0xffffffff),
                                child: Text('Accept All',
                                  style: TextStyle(
                                    color: new Color(0xff0F3057),
                                  ),),
                                onPressed: () {},
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      30.0),)
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 3.0),
                            child: RaisedButton(
                                color: new Color(0xffffffff),
                                child: Text('Accept All',
                                  style: TextStyle(
                                    color: new Color(0xff0F3057),
                                  ),),
                                onPressed: () {},
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      30.0),)
                            ),
                          ),

                        ],),
                    ],),
                ),
              ),
              
            ],
          ),
        ),
      ),
    );
  }
}

ListTile myRowDataIcon(IconData iconVal, String rowVal) {
  return ListTile(
    leading: Icon(iconVal,
        color: new Color(0xffffffff)),
    title: Text(rowVal, style: TextStyle(
      color: Colors.white,
    ),),
  );
}

Widget _goBackButton(BuildContext context) {
  return IconButton(
      icon: Icon(Icons.arrow_back, color: Color(0xff0F3057)),
      onPressed: () {
        Navigator.of(context).pop(true);
      });
}*/

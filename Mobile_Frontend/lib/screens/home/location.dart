import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart';

class Location extends StatefulWidget {
  @override
  LocationState createState() => LocationState();
}

class LocationState extends State<Location> {
  Completer<GoogleMapController> _controller = Completer();
  final Map<String, Marker> _markers = {};
  var listData = [];

  @override
  void initState() {
    //_getBinLocation();
    fetchUnits();
    super.initState();
  }

  double zoomVal = 5.0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
            icon: Icon(FontAwesomeIcons.arrowLeft),
            onPressed: () {
              //
            }),
        title: Text("New York"),
        actions: <Widget>[
          IconButton(
              icon: Icon(FontAwesomeIcons.search),
              onPressed: () {
                //
              }),
        ],
      ),
      body: Stack(
        children: <Widget>[
          _buildGoogleMap(context),
          _zoomminusfunction(),
          _zoomplusfunction(),
          _buildContainer(),
        ],
      ),
    );
  }

  Widget _zoomminusfunction() {
    return Align(
      alignment: Alignment.topLeft,
      child: IconButton(
          icon: Icon(FontAwesomeIcons.searchMinus, color: Color(0xff6200ee)),
          onPressed: () {
            zoomVal--;
            _minus(zoomVal);
          }),
    );
  }

  Widget _zoomplusfunction() {
    return Align(
      alignment: Alignment.topRight,
      child: IconButton(
          icon: Icon(FontAwesomeIcons.searchPlus, color: Color(0xff6200ee)),
          onPressed: () {
            zoomVal++;
            _plus(zoomVal);
          }),
    );
  }

  Future<void> _minus(double zoomVal) async {
    final GoogleMapController controller = await _controller.future;
    controller.animateCamera(CameraUpdate.newCameraPosition(
        CameraPosition(target: LatLng(6.802485, 79.922033), zoom: zoomVal)));
  }

  Future<void> _plus(double zoomVal) async {
    final GoogleMapController controller = await _controller.future;
    controller.animateCamera(CameraUpdate.newCameraPosition(
        CameraPosition(target: LatLng(6.802485, 79.922033), zoom: zoomVal)));
  }

  Widget _buildContainer() {
    return Align(
      alignment: Alignment.bottomLeft,
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 20.0),
        height: 150.0,
        child: ListView(
          scrollDirection: Axis.horizontal,
          children: <Widget>[
            SizedBox(width: 10.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: _boxes(6.8022, 79.9226, "kegalle"),
            ),
            SizedBox(width: 10.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: _boxes(6.8007, 79.9219, "rambukkana"),
            ),
            SizedBox(width: 10.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: _boxes(6.8008, 79.9226, "halwathura"),
            ),
          ],
        ),
      ),
    );
  }

  Widget _boxes(double lat, double long, String unitName) {
    return GestureDetector(
      onTap: () {
        _gotoLocation(lat, long);
      },
      child: Container(
        child: new FittedBox(
          child: Material(
              color: Colors.white,
              elevation: 14.0,
              borderRadius: BorderRadius.circular(24.0),
              shadowColor: Color(0x802196F3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Container(
                    width: 20,
                    height: 40,
                    child: ClipRRect(
                      borderRadius: new BorderRadius.circular(24.0),
                      child: Image(
                        fit: BoxFit.fill,
                        image: AssetImage('images/collector.png'),
                      ),
                    ),
                  ),
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: myDetailsContainer1(unitName),
                    ),
                  ),
                ],
              )),
        ),
      ),
    );
  }

  Widget myDetailsContainer1(String unitName) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.only(left: 9.0),
          child: Container(
              child: Text(
            unitName,
            style: TextStyle(
                color: Color(0xff6200ee),
                fontSize: 10.0,
                fontWeight: FontWeight.bold),
          )),
        ),
        SizedBox(height: 3.0),
      ],
    );
  }

  Widget _buildGoogleMap(BuildContext context) {
    //_getBinLocation();
    return Container(
      height: MediaQuery.of(context).size.height,
      width: MediaQuery.of(context).size.width,
      child: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition:
            CameraPosition(target: LatLng(6.802485, 79.922033), zoom: 20),
        onMapCreated: (GoogleMapController controller) {
          _controller.complete(controller);
        },
        //markers: _markers.values.toSet()
        markers: {
          kegalleMarker, rabukkanaMarker, halwathuraMarker
          //_markers.values.toSet(),
        },
      ),
    );
  }

  Future<void> _gotoLocation(double lat, double long) async {
    final GoogleMapController controller = await _controller.future;
    controller.animateCamera(CameraUpdate.newCameraPosition(CameraPosition(
      target: LatLng(lat, long),
      zoom: 15,
      tilt: 50.0,
      bearing: 45.0,
    )));
  }
}

var listData = [];
final Map<String, Marker> _markers = {};

class Unitdata {
  String location;
  String longitude;
  String latitude;

  Unitdata({
    this.location,
    this.longitude,
    this.latitude,
  });

  factory Unitdata.fromJson(Map<String, dynamic> json) {
    return Unitdata(
      location: json['location'],
      longitude: json['longitude'],
      latitude: json['latitude'],
    );
  }
}

//didn't work
void fetchUnits() async {
  var requestList;
  Map data = {'collector_ID': 8};
  //SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  try {
    var response = await get(Uri.parse(
        'http://192.168.8.148:8000/api/getUnitLocation?collector_ID=9'));
    //sharedPreferences.getString("token");
    //print(sharedPreferences.getString("token"));

    if (response.statusCode == 200) {
      requestList = json.decode(response.body) as List;
      listData = requestList;
      print(listData);
    } else {
      throw Exception('Failed to load data');
    }
  } catch (err) {}

  for (final item in listData) {
    final marker = Marker(
      icon: BitmapDescriptor.defaultMarkerWithHue(
        BitmapDescriptor.hueViolet,
      ),
      infoWindow: InfoWindow(title: item['location']),
      markerId: MarkerId(item['location']),
      position: LatLng(item['latitude'], item['longitude']),
    );
    print(item['location']);
    _markers[item['location']] = marker;
  }
}

void setState(Null Function() param0) {}

Marker kegalleMarker = Marker(
  markerId: MarkerId('Kegalle'),
  position: LatLng(6.8022, 79.9226),
  infoWindow: InfoWindow(title: 'Kegalle'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueGreen,
  ),
);

Marker rabukkanaMarker = Marker(
  markerId: MarkerId('rabukkana'),
  position: LatLng(6.8007, 79.9219),
  infoWindow: InfoWindow(title: 'rabukkana'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueGreen,
  ),
);
Marker halwathuraMarker = Marker(
  markerId: MarkerId('halwathura'),
  position: LatLng(6.8008, 79.9226),
  infoWindow: InfoWindow(title: 'halwathura'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueGreen,
  ),
);

//New York Marker

/*Marker newyork1Marker = Marker(
  markerId: MarkerId('newyork1'),
  position: LatLng(40.742451, -74.005959),
  infoWindow: InfoWindow(title: 'Los Tacos'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueViolet,
  ),
);
Marker newyork2Marker = Marker(
  markerId: MarkerId('newyork2'),
  position: LatLng(40.729640, -73.983510),
  infoWindow: InfoWindow(title: 'Tree Bistro'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueViolet,
  ),
);
Marker newyork3Marker = Marker(
  markerId: MarkerId('newyork3'),
  position: LatLng(40.719109, -74.000183),
  infoWindow: InfoWindow(title: 'Le Coucou'),
  icon: BitmapDescriptor.defaultMarkerWithHue(
    BitmapDescriptor.hueViolet,
  ),
);*/

import 'dart:async';
import 'dart:developer';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:geolocator/geolocator.dart';

class Mappage extends StatefulWidget {
  Mappage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MappageState createState() => _MappageState();
}

class _MappageState extends State<Mappage> {
  Completer<GoogleMapController> _controllerGoogleMap = Completer();
  GoogleMapController newGoogleMapController;
  Position currentposition;
  var geolocator = Geolocator();
  double bottomPaddingofMap = 0;
  static final CameraPosition _cameraPosition =
      CameraPosition(target: LatLng(6.270763, 80.093856), zoom: 5);

  void locatebins() async {
    Position position = await Geolocator.getCurrentPosition();
    currentposition = position;
    LatLng latlng = LatLng(position.latitude, position.longitude);
    print(position.latitude);
    print(position.longitude);
    CameraPosition cameraposition =
        new CameraPosition(target: latlng, zoom: 14);
    newGoogleMapController
        .animateCamera(CameraUpdate.newCameraPosition(cameraposition));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Locate Bins"),
        ),
        body: Stack(children: [
          GoogleMap(
            padding: EdgeInsets.only(bottom: bottomPaddingofMap),
            mapType: MapType.normal,
            myLocationButtonEnabled: true,
            myLocationEnabled: true,
            zoomGesturesEnabled: true,
            zoomControlsEnabled: true,
            initialCameraPosition: _cameraPosition,
            //markers: Set.of((marker != null) ? [marker] : []),
            //circles: Set.of((circle != null) ? [circle] : []),

            onMapCreated: (GoogleMapController controller) {
              _controllerGoogleMap.complete(controller);
              newGoogleMapController = controller;
              setState(() {
                bottomPaddingofMap = 300.0;
              });

              locatebins();
            },
          ),
        ]));
  }
}
/*

class _MappageState extends State<Mappage> {
  StreamSubscription _locationSubscription;
  Location _locationTracker;
  Marker marker;
  Circle circle;
  GoogleMapController _controller;
  //Completer<GoogleMapController> _controller = Completer();
  //Completer<GoogleMapController> _controllerGoogleMap = Completer();

  static final CameraPosition initialLocation = CameraPosition(
    target: LatLng(-7.4122619, 144.2398217),
    zoom: 14.4746,
  );

  @override
  void initState() {
    getCurrentLocation();
    super.initState();
  }

  Future<Uint8List> getMarker() async {
    ByteData byteData =
        await DefaultAssetBundle.of(context).load("images/garbage.png");
    return byteData.buffer.asUint8List();
  }

  void updateMarkerAndCircle(LocationData newLocalData, Uint8List imageData) {
    LatLng latlng = LatLng(newLocalData.latitude, newLocalData.longitude);
    // LatLng latlng = LatLng(newLocalData!.latitude!, newLocalData!.longitude!);
    // ignore: unnecessary_this
    this.setState(() {
      marker = Marker(
          markerId: MarkerId("home"),
          position: latlng,
          rotation: newLocalData.heading,
          draggable: false,
          zIndex: 2,
          flat: true,
          anchor: Offset(0.5, 0.5),
          icon: BitmapDescriptor.fromBytes(imageData));
      circle = Circle(
          circleId: CircleId("vehicle"),
          radius: newLocalData.accuracy,
          zIndex: 1,
          strokeColor: Colors.blue,
          center: latlng,
          fillColor: Colors.blue.withAlpha(70));
    });
  }

  void getCurrentLocation() async {
    try {
      Uint8List imageData = await getMarker();
      var location = await _locationTracker.getLocation();

      updateMarkerAndCircle(location, imageData);

      if (_locationSubscription != null) {
        _locationSubscription.cancel();
      }

      _locationSubscription =
          _locationTracker.onLocationChanged.listen((newLocalData) {
        if (_controller != null) {
          _controller.animateCamera(CameraUpdate.newCameraPosition(
              new CameraPosition(
                  bearing: 192.8334901395799,
                  target: LatLng(newLocalData.latitude, newLocalData.longitude),
                  tilt: 0,
                  zoom: 18.00)));
          updateMarkerAndCircle(newLocalData, imageData);
        }
      });
    } on PlatformException catch (e) {
      if (e.code == 'PERMISSION_DENIED') {
        debugPrint("Permission Denied");
      }
    }
  }

  @override
  void dispose() {
    if (_locationSubscription != null) {
      _locationSubscription.cancel();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: initialLocation,
        markers: Set.of((marker != null) ? [marker] : []),
        circles: Set.of((circle != null) ? [circle] : []),
        onMapCreated: (GoogleMapController controller) {
          _controller = controller;
        },
      ),
      floatingActionButton: FloatingActionButton(
          child: Icon(Icons.location_searching),
          onPressed: () {
            getCurrentLocation();
          }),
    );
  }
}
*/
import 'dart:async';
import 'dart:developer';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:geolocator/geolocator.dart';

/*class Mappage extends StatefulWidget {
  Mappage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MappageState createState() => _MappageState();
}

class _MappageState extends State<Mappage> {
  final TextEditingController _searchController = TextEditingController();
  Completer<GoogleMapController> _controllerGoogleMap = Completer();

  BitmapDescriptor _mapMarkerIcon;
  BitmapDescriptor _selectedMarkerIcon;
  //StoreLocation previousLocation;

  bool _isLoading = true;

  final Map<String, Marker> _markers = {};
  //List<StoreLocation> _storeLocations = [];
  //List<StoreLocation> _tempStoreLocations = [];

  static final CameraPosition _cameraPosition =
      CameraPosition(target: LatLng(-7.4122619, 144.2398217), zoom: 5);

  @override
  void initState() {
    getUserLocation();
    super.initState();
  }

  void getUserLocation() async {
    _determinePosition().then((value) {
      Future.delayed(Duration(milliseconds: 300), () {
        getStores();
      });
    }).onError((error, stackTrace) {
      log("Location Error: " + error.toString());
    });
  }

  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }
    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }
    return await Geolocator.getCurrentPosition();
  }
}*/
class Mappage extends StatefulWidget {
  Mappage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MappageState createState() => _MappageState();
}

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
  @override
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

  /*void _onMapCreated(GoogleMapController controller) {
    _controllerGoogleMap.complete(controller);
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: GoogleMap(
        mapType: MapType.hybrid,
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

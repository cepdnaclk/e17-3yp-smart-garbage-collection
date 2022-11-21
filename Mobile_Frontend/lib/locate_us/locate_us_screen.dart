import 'dart:async';
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:mobile/model/direction_repository.dart';
import 'package:mobile/model/directions.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocateUsScreen extends StatefulWidget {
  const LocateUsScreen({Key key}) : super(key: key);

  @override
  _LocateUsScreenState createState() => _LocateUsScreenState();
}

class _LocateUsScreenState extends State<LocateUsScreen> {
  static const _initialCameraPosition =
      CameraPosition(target: LatLng(6.7159, 80.0626), zoom: 12);

//  List<StoreLocation> _storeLocations = [];
  // List<StoreLocation> _tempStoreLocations = [];
  //List _markers = [];
  final Map<String, Marker> _markers = {};
  //final Map<String, Marker> _markerslist = {};
  var listData = [];

  void initState() {
    super.initState();
    _getlist();
    //checkLogin();
  }

  GoogleMapController _googleMapController;
  Marker _origin;
  Marker _destination;
  Directions _info;

  void _getlist() async {
    var requestList;
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    var headers = sharedPreferences.getString("token");
    try {
      
      var response = await get(
          Uri.parse(
              'http://54.178.202.126:4009/api/getUnitLocation'),
          headers: {'authorization': 'Bearer $headers',});

      if (response.statusCode == 200) {
        setState(() {
          print(json.decode(response.body));
          requestList = json.decode(response.body) as List;

          listData = requestList;
        });

        print('this is it $listData');

        for (final item in listData) {
          print(item['latitude']);
          final marker = Marker(
              markerId: MarkerId(item['location']),
              infoWindow: InfoWindow(title: item['location']),
              icon: BitmapDescriptor.defaultMarkerWithHue(
                  BitmapDescriptor.hueGreen),
              position: LatLng(item['latitude'], item['longitude']),
              onTap: () async {
                print("hi");

                final directions = await DirectionRepository().getDirections(
                    origin: LatLng(6.7159, 80.0626),
                    destination: LatLng(item['latitude'], item['longitude']));
                setState(() {
                  _info = directions;
                });
              });
          _markers[item['location']] = marker;
          print('markers pleae note:$_markers');
        }
        //return listData;
      }
    } catch (err) {
      print(err);
    }
  }

  @override
  void dispose() {
    _googleMapController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: false,
          title: const Text('Google Maps'),
        ),
        body: Stack(
          alignment: Alignment.center,
          children: [
            GoogleMap(
              myLocationButtonEnabled: true,
              initialCameraPosition: _initialCameraPosition,
              onMapCreated: (controller) => _googleMapController = controller,
              polylines: {
                if (_info != null)
                  Polyline(
                      polylineId: PolylineId('overview_polyline'),
                      color: Colors.red,
                      width: 5,
                      points: _info.polylinePoints
                          .map((e) => LatLng(e.latitude, e.longitude))
                          .toList()),
              },
              markers: _markers.values.toSet(),
              onLongPress: _addMarker,
            ),
            if (_info != null)
              Positioned(
                  top: 20,
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 6, horizontal: 12),
                    decoration: BoxDecoration(
                      color: Colors.yellowAccent,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child:
                        Text('${_info.totalDistance},${_info.totalDuration}'),
                  ))
          ],
        ),
        floatingActionButton: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            InkWell(
              onTap: () => _googleMapController.animateCamera(_info != null
                  ? CameraUpdate.newLatLngBounds(_info.bounds, 100.0)
                  : CameraUpdate.newCameraPosition(_initialCameraPosition)),
              child: Container(
                height: 40,
                width: 40,
                child: Icon(
                  Icons.center_focus_strong,
                  color: Colors.black,
                  size: 40,
                ),
              ),
            ),
          ],
        ));
  }

  void _addMarker(LatLng pos) async {
    if (_origin == null || (_origin != null && _destination != null)) {
      setState(() {
        _origin = Marker(
          markerId: const MarkerId('Horana'),
          infoWindow: InfoWindow(title: 'origin'),
          icon:
              BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
          position: pos,
        );
        _destination = null;
        _info = null;
      });
    } else {
      setState(() {
        _destination = Marker(
          markerId: const MarkerId('pokunuwita'),
          infoWindow: InfoWindow(title: 'destination'),
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          position: pos,
        );
      });
      final directions = await DirectionRepository()
          .getDirections(origin: _origin.position, destination: pos);
      setState(() {
        _info = directions;
      });
    }
  }
}

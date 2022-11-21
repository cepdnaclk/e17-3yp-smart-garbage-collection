class StoreLocation {
  String name;
  double latitude;
  double longitude;

  StoreLocation({
    this.name,
    this.latitude,
    this.longitude,
  });

  factory StoreLocation.fromJson(Map<String, dynamic> json) {
    return StoreLocation(
      name: json['name'],
      latitude: json['latitude'],
      longitude: json['longitude'],
    );
  }

  @override
  String toString() {
    return 'StoreLocation{name: $name,  latitude: $latitude, longitude: $longitude}';
  }
}

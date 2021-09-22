import 'package:mobile/models/user.dart';
import 'package:firebase_auth/firebase_auth.dart';

class AuthService{

  final FirebaseAuth _auth = FirebaseAuth.instance;

  // create user obj based on firebase user
  Users _userFromFirebase(User user) {
    //if (user == null){
      //return null;
    //}
    return Users(uid: user.uid);
  }


  Stream<Users> get user {

    return _auth.authStateChanges()
      .map((user) => _userFromFirebase(user!));
      //.map(_userFromFirebase);
  }

  // sign in with email and password

  //sign up

  //sign out
}
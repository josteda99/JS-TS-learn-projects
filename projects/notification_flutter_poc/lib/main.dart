import 'package:awesome_notifications_fcm/awesome_notifications_fcm.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:notification_flutter_poc/my_app.dart';
import 'package:notification_flutter_poc/notification_controller.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  static Future<void> initializeRemoteNotifications({
    required bool debug,
  }) async {
    await Firebase.initializeApp(
      options: FirebaseOptions(
        apiKey: 'AIzaSyBqLPn0Sbyw_VuF5CUQOU3VKeY5Du85bHU',
        appId: '1:111777901267:android:5b3e2bbf3a7376b42b4226',
        messagingSenderId: '111777901267',
        projectId: 'notpoc-9b8c0',
        storageBucket: 'myapp-b9yt18.appspot.com',
      ),
    );
    await AwesomeNotificationsFcm().initialize(
      onFcmSilentDataHandle: NotificationController.mySilentDataHandle,
      onFcmTokenHandle: NotificationController.myFcmTokenHandle,
      onNativeTokenHandle: NotificationController.myNativeTokenHandle,
      debug: debug,
    );
    print("entro");
  }

  @override
  Widget build(BuildContext context) {
    AwesomeNotifications().initialize(
      // set the icon to null if you want to use the default app icon
      null,
      [
        NotificationChannel(
          channelGroupKey: 'basic_channel_group',
          channelKey: 'basic_channel',
          channelName: 'Basic notifications',
          channelDescription: 'Notification channel for basic tests',
          defaultColor: Color(0xFF9D50DD),
          ledColor: Colors.white,
        ),
      ],
      // Channel groups are only visual and are not required
      channelGroups: [
        NotificationChannelGroup(
          channelGroupKey: 'basic_channel_group',
          channelGroupName: 'Basic group',
        ),
      ],
      debug: true,
    );
    initializeRemoteNotifications(debug: true);
    return MaterialApp(home: MyApp());
  }
}

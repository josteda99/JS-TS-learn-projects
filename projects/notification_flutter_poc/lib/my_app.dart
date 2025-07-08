import 'package:flutter/material.dart';
import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:notification_flutter_poc/notification_controller.dart';
import 'package:notification_flutter_poc/my_home_page.dart';
import 'package:notification_flutter_poc/my_notification_page.dart';

class MyApp extends StatefulWidget {
  static final GlobalKey<NavigatorState> navigatorKey =
      GlobalKey<NavigatorState>();

  static const String name = 'Awesome Notifications - Example App';
  static const Color mainColor = Colors.deepPurple;

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    // Only after at least the action method is set, the notification events are delivered
    AwesomeNotifications().setListeners(
      onActionReceivedMethod: NotificationController.onActionReceivedMethod,
      onNotificationCreatedMethod:
          NotificationController.onNotificationCreatedMethod,
      onNotificationDisplayedMethod:
          NotificationController.onNotificationDisplayedMethod,
      onDismissActionReceivedMethod:
          NotificationController.onDismissActionReceivedMethod,
    );

    super.initState();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // The navigator key is necessary to allow to navigate through static methods
      navigatorKey: MyApp.navigatorKey,

      title: MyApp.name,
      color: MyApp.mainColor,

      initialRoute: '/',
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(
              builder: (context) {
                ReceivedAction? receivedAction;
                if (settings.arguments != null) {
                  receivedAction = settings.arguments as ReceivedAction;
                }
                return MyHomePage(receivedAction: receivedAction);
              },
            );

          case '/notification-page':
            return MaterialPageRoute(
              builder: (context) {
                final ReceivedAction receivedAction =
                    settings.arguments as ReceivedAction;
                return MyNotificationPage(receivedAction: receivedAction);
              },
            );

          default:
            assert(false, 'Page ${settings.name} not found');
            return null;
        }
      },

      theme: ThemeData(primarySwatch: Colors.deepPurple),
    );
  }
}

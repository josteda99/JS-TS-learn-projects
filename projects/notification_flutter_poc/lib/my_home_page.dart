import 'package:flutter/material.dart';
import 'package:awesome_notifications/awesome_notifications.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          TextButton(
            onPressed: () => showDialog<String>(
              context: context,
              builder: (BuildContext context) => AlertDialog(
                title: const Text('Notification permission alert'),
                content: const Text('please allow permissions'),
                actions: <Widget>[
                  TextButton(
                    onPressed: () => Navigator.pop(context, 'Cancel'),
                    child: const Text('Cancel'),
                  ),
                  TextButton(
                    onPressed: () {
                      AwesomeNotifications().isNotificationAllowed().then((
                        isAllowed,
                      ) {
                        print('isAllowed: $isAllowed');
                        if (!isAllowed) {
                          AwesomeNotifications()
                              .requestPermissionToSendNotifications();
                        }
                      });
                      Navigator.pop(context, 'OK');
                    },
                    child: const Text('OK'),
                  ),
                ],
              ),
            ),
            child: const Text(
              'Show Dialog',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          TextButton(
            onPressed: () {
              AwesomeNotifications().createNotification(
                content: NotificationContent(
                  id: 10,
                  channelKey: 'basic_channel',
                  actionType: ActionType.Default,
                  title: 'Thankuy !',
                  body: 'This is my first notification!',
                ),
              );
            },
            child: const Text(
              'Get Notifation please',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}

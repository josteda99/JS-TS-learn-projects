import 'package:flutter/material.dart';
import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:notification_flutter_poc/notification_controller.dart';

class MyHomePage extends StatefulWidget {
  final ReceivedAction? receivedAction;

  const MyHomePage({super.key, required this.receivedAction});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  TimeOfDay? _selectedTime;

  Future<void> _pickTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (picked != null) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  void _scheduleNotification() {
    if (_selectedTime == null) return;

    final now = DateTime.now();
    final scheduledDate = DateTime(
      now.year,
      now.month,
      now.day,
      _selectedTime!.hour,
      _selectedTime!.minute,
    );
    // If the selected time is before now, schedule for the next day
    final notificationDate = scheduledDate.isBefore(now)
        ? scheduledDate.add(const Duration(days: 1))
        : scheduledDate;

    AwesomeNotifications().createNotification(
      content: NotificationContent(
        id: 20,
        channelKey: 'basic_channel',
        title: 'Scheduled Notification',
        body: 'Time to ruuuuun',
      ),
      schedule: NotificationCalendar(
        year: notificationDate.year,
        month: notificationDate.month,
        day: notificationDate.day,
        hour: notificationDate.hour,
        minute: notificationDate.minute,
        second: 0,
        millisecond: 0,
        repeats: false,
      ),
      actionButtons: [
        NotificationActionButton(
          key: 'WAIT_10_MIN',
          label: 'Wait 10 Minutes',
          actionType: ActionType.KeepOnTop,
        ),
        NotificationActionButton(
          key: 'SKIP',
          label: 'skip',
          actionType: ActionType.KeepOnTop,
        ),
        NotificationActionButton(
          key: 'DONE',
          label: 'Done',
          actionType: ActionType.Default,
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 50.0),
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
              'Show dialog to request permission',
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
              'Display Local Notification',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          TextButton(
            onPressed: () {
              NotificationController.getFirebaseMessagingToken();
            },
            child: const Text(
              'Get access token',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          TextButton(
            onPressed: () => _pickTime(context),
            child: Text(
              _selectedTime == null
                  ? 'Pick Time for Notification'
                  : 'Picked: ${_selectedTime!.format(context)}',
              style: const TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          TextButton(
            onPressed: _selectedTime == null ? null : _scheduleNotification,
            child: const Text(
              'Schedule Notification',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          Text(
            showMessage(),
            style: const TextStyle(fontSize: 40, color: Colors.white),
          ),
        ],
      ),
    );
  }

  String showMessage() {
    if (widget.receivedAction?.actionType == ActionType.Default) {
      return 'Done at ${widget.receivedAction?.actionDate}';
    } else if (widget.receivedAction?.actionType == ActionType.KeepOnTop) {
      if (widget.receivedAction?.buttonKeyPressed == 'WAIT_10_MIN') {
        return 'Wait 10 minutes at ${widget.receivedAction?.actionDate}';
      } else if (widget.receivedAction?.buttonKeyPressed == 'SKIP') {
        return 'Skiped at ${widget.receivedAction?.actionDate}';
      }
    }
    return "";
  }
}

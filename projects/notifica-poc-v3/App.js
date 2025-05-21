import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

    Notifications.setNotificationCategoryAsync("MEDICATION_REMINDER", [
      {
        identifier: "TAKEN",
        buttonTitle: "Taken",
        options: {
          isAuthenticationRequired: false,
          opensAppToForeground: true,
        },
      },
      {
        identifier: "SKIP",
        buttonTitle: "Skip",
        options: {
          isDestructive: true,
          opensAppToForeground: true,
        },
      },
      {
        identifier: "WAIT",
        buttonTitle: "Wait 5 minutes",
        options: {
          isDestructive: true,
          opensAppToForeground: true,
        },
      },
    ]);

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <Text>{`Channels: ${JSON.stringify(
        channels.map((c) => c.id),
        null,
        2
      )}`}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Medication Reminder",
      subtitle: "Daily Health Check",
      body: "It's 08:00 AM. Time to take your Ibuprofen 400mg. Please confirm once done.",
      data: {
        reminderType: "medication",
        medicineName: "Ibuprofen 400mg",
        dosage: "1 pill",
        time: "08:00 AM",
        notes: "Take with a glass of water after breakfast.",
      },
      badge: 1,
      sound: true, // or you can use a string like "custom_sound.wav" if configured
      launchImageName: "LaunchImage", // iOS specific
      vibrate: [200, 100, 200, 100, 400], // Android specific vibration pattern
      priority: "high", // Android specific
      color: "#FF5722", // Accent color (Android)
      autoDismiss: true, // Android specific
      categoryIdentifier: "MEDICATION_REMINDER", // iOS specific
      sticky: false, // Android: notification can be swiped away
      attachments: [
        {
          identifier: "med-image",
          url: "https://example.com/images/ibuprofen.png",
          type: "image/png",
        },
      ], // iOS specific visual/audio attachments
      interruptionLevel: "critical", // iOS notification beh
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

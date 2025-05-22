import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, SafeAreaView, Pressable, Animated } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import "./global.css";

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
  const [date, setDate] = useState(new Date());
  const [showReminder, setShowReminder] = useState(false);
  const [medicationComplete, setMedicationComplete] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const fillAnim = useRef(new Animated.Value(0)).current;

  // Start the fill animation
  const startFill = () => {
    Animated.timing(fillAnim, {
      toValue: 1,
      duration: 3000, // 3 seconds
      useNativeDriver: false,
    }).start();
  };

  // Reset the fill animation
  const resetFill = () => {
    fillAnim.setValue(0);
  };

  useEffect(() => {
    if (date) schedulePushNotificationDate(date);
  }, [date]);

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

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const { actionIdentifier } = response;
      if (actionIdentifier === "WAIT") {
        await schedulePushNotificationDate(new Date(Date.now() + 5 * 60 * 1000));
      }
      if (actionIdentifier === "expo.modules.notifications.actions.DEFAULT") {
        setShowReminder(true);
      }
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const className = medicationComplete ? "bg-green-500" : "bg-red-500";

  return (
    <SafeAreaView className="bg-slate-900 flex-1 pt-20 p-10">
      <Text className="text-4xl text-white mb-5">VitaPels</Text>
      {/* <View className="bg-slate-700 p-5 rounded-lg mb-5">
        <Text className="text-white">Your expo push token: {expoPushToken}</Text>
        <Text className="text-white">{`Channels: ${JSON.stringify(
          channels.map((c) => c.id),
          null,
          2
        )}`}</Text>
      </View> */}

      <Button onPress={showTimepicker} title="Show time picker!" />
      <View className="flex justify-center items-center bg-purple-900 rounded-lg mt-5 ">
        <Text className="text-white text-lg">selected: {date.toLocaleString()}</Text>
      </View>

      {showReminder && (
        <Pressable
          delayLongPress={3000}
          onPressIn={startFill}
          onPressOut={resetFill}
          onLongPress={() => {
            resetFill();
            setMedicationComplete(true);
          }}
          style={{ marginTop: 20, borderRadius: 12, overflow: "hidden", width: "100%" }}>
          <View className={`flex justify-center items-center  rounded-lg py-10 ${className}`}>
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: fillAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: "#38bdf8",
                zIndex: 0,
              }}
            />

            <Text className="text-white text-center text-lg my-10" style={{ zIndex: 1 }}>
              Please press the button to complete your medication
            </Text>
          </View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

async function schedulePushNotificationSeconds() {
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

async function schedulePushNotificationDate(date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Heyyyy! remember to take your meds",
      subtitle: "VitaPels",
      body: `It's ${date.getHours()}:${date.getMinutes()}. Time to take your Ibuprofen 400mg. Please confirm once done.`,
      data: {
        reminderType: "medication",
        medicineName: "Ibuprofen 400mg",
        dosage: "1 pill",
        time: "08:00 AM",
        notes: "Take with a glass of water after breakfast.",
      },
      badge: 1,
      sound: true,
      launchImageName: "LaunchImage",
      vibrate: [200, 100, 200, 100, 400],
      priority: "high",
      color: "#FF5722",
      autoDismiss: true,
      categoryIdentifier: "MEDICATION_REMINDER",
      sticky: false,
      attachments: [
        {
          identifier: "med-image",
          url: "https://example.com/images/ibuprofen.png",
          type: "image/png",
        },
      ],
      interruptionLevel: "critical",
    },
    // trigger: {
    //   type: Notifications.SchedulableTriggerInputTypes.DATE,
    //   date: date,
    // },
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
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

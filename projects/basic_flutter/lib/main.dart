import 'package:basic_flutter/components/image.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("mi su0er app"),
          actions: [IconButton(onPressed: () {}, icon: Icon(Icons.abc))],
        ),
        body: ImageExample(),
        floatingActionButton: FloatingActionButton(onPressed: () {}),
      ),
    );
  }
}

import 'package:color_selector_widget/components/color_pallete.dart';
import 'package:color_selector_widget/components/color_pallete_v2.dart';
import 'package:flutter/material.dart';

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  String selectedColor = "pink";

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: const Color.fromARGB(255, 32, 32, 32),
      child: Column(
        children: [
          ColorPallete(
            selectedColor: selectedColor,
            onSelectColor: (color) {
              setState(() {
                selectedColor = color;
              });
            },
          ),
          ColorPalleteV2(
            selectedColor: selectedColor,
            onSelectColor: (color) {
              setState(() {
                selectedColor = color;
              });
            },
          ),
        ],
      ),
    );
  }
}

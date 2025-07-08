import 'package:color_selector_widget/color_list.dart';
import 'package:flutter/material.dart';

class ColorPallete extends StatefulWidget {
  final Function(String) onSelectColor;
  final String selectedColor;

  const ColorPallete({
    super.key,
    required this.onSelectColor,
    required this.selectedColor,
  });

  @override
  State<ColorPallete> createState() => _ColorPalleteState();
}

class _ColorPalleteState extends State<ColorPallete> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 119, 119, 119),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 20.0),
                    child: Text(
                      "Color Selector",
                      style: TextStyle(fontSize: 30, color: Colors.white),
                    ),
                  ),
                  Wrap(
                    direction: Axis.horizontal,
                    alignment: WrapAlignment.start,
                    spacing: 0.1,
                    runSpacing: 10.0,
                    children: ColorName.colorList.map((color) {
                      return ElevatedButton(
                        onPressed: () {
                          widget.onSelectColor(color.name);
                        },
                        child: null,
                        style: ElevatedButton.styleFrom(
                          shape: const CircleBorder(),
                          backgroundColor: color.color,
                          padding: const EdgeInsets.all(30.0),
                          side: widget.selectedColor == color.name
                              ? const BorderSide(color: Colors.cyan, width: 5.0)
                              : BorderSide.none,
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

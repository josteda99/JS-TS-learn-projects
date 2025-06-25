import 'package:flutter/material.dart';

class ColumnExample extends StatelessWidget {
  const ColumnExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: const Color.fromRGBO(54, 54, 54, 1),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text("Hola, soy johan"),
          Text("Hola, soy johan"),
          Text("Hola, soy johan"),
          Text("Hola, soy johan"),
          Text("Hola, soy johan"),
        ],
      ),
    );
  }
}

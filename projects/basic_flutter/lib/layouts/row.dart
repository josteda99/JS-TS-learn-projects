import 'package:flutter/material.dart';

class RowExample extends StatelessWidget {
  const RowExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 86),
      child: SizedBox(
        height: double.infinity,
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text("example 1"),
            Expanded(child: Text("example 1")),
            Text("example 1"),
          ],
        ),
      ),
    );
  }
}

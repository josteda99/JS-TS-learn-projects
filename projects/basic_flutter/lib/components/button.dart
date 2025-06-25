import 'package:flutter/material.dart';

class ButtonExample extends StatelessWidget {
  const ButtonExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Spacer(),
        ElevatedButton(
          onPressed: () {
            print("pulsado");
          },
          child: Text("Soy un boton"),
          onLongPress: () {
            print("pulsadoooooooooooooo");
          },
          style: ButtonStyle(
            backgroundColor: WidgetStateProperty.all(Colors.red),
          ),
        ),
        OutlinedButton(onPressed: () {}, child: Text("Outlined")),
        TextButton(onPressed: () {}, child: Text("Outlined")),
        FloatingActionButton(onPressed: () {}, child: Icon(Icons.add)),
        IconButton(onPressed: () {}, icon: Icon(Icons.favorite)),
        Spacer(),
      ],
    );
  }
}

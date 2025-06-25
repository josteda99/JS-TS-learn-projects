import 'package:flutter/material.dart';

class TextExample extends StatelessWidget {
  const TextExample({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Spacer(),
        Text("Texto basico"),
        Text("Texto basico", style: TextStyle(fontSize: 24)),
        Text("Texto basico", style: TextStyle(fontWeight: FontWeight.bold)),
        Text("Texto basico", style: TextStyle(fontStyle: FontStyle.italic)),
        Text(
          "Texto basico",
          style: TextStyle(
            color: Colors.red,
            fontSize: 30,
            backgroundColor: Colors.blue,
          ),
        ),
        Text(
          "Decoreator",
          style: TextStyle(decoration: TextDecoration.lineThrough),
        ),
        Text(
          "Espaciado entre letras",
          style: TextStyle(letterSpacing: 5, fontSize: 30),
        ),
        Text(
          "Espaciado entre letras,Espaciado entre letras,Espaciado entre letras,Espaciado entre letras,Espaciado entre letras,Espaciado entre letras,vEspaciado entre letrasEspaciado entre letrasEspaciado entre letrasEspaciado entre letrasEspaciado entre letrasEspaciado entre letras",
          style: TextStyle(fontSize: 30),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        Spacer(),
      ],
    );
  }
}

import 'package:dart_basics/dart_basics.dart' as dart_basics;

void main(List<String> arguments) {
  // numeric variables
  int age = 21;
  double age2 = 31.1;
  num age3 = 12;
  num age4 = 12.1;

  //string variables
  String name = "test";

  //static caraibles
  final String namee = "asdasd";
  const String example = "qweqwe";

  String date = "1993";
  int dateNumber = int.parse(date);
  print("Tienes ${2025 - dateNumber} años.");
}

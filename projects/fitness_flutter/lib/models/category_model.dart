import 'package:flutter/material.dart';

class CategoryModel {
  String name;
  String iconPath;
  Color boxColor;

  CategoryModel({
    required this.name,
    required this.iconPath,
    required this.boxColor,
  });

  static List<CategoryModel> getCategories() {
    List<CategoryModel> categories = [];
    categories.add(
      CategoryModel(
        name: "Salad",
        iconPath: "icons/pie.svg",
        boxColor: Color(0xff92A3FD),
      ),
    );

    categories.add(
      CategoryModel(
        name: "Cake",
        iconPath: "icons/plate.svg",
        boxColor: Color(0xffC58Bf2),
      ),
    );
    categories.add(
      CategoryModel(
        name: "Pie",
        iconPath: "icons/pie.svg",
        boxColor: Color(0xff92A3FD),
      ),
    );
    categories.add(
      CategoryModel(
        name: "Smothies",
        iconPath: "icons/plate.svg",
        boxColor: Color(0xffC58Bf2),
      ),
    );
    return categories;
  }
}

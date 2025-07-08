import 'package:color_selector_widget/colors_values.dart';
import 'package:flutter/material.dart';

class ColorName {
  final String name;
  final Color color;

  ColorName(this.name, this.color);

  static List<ColorName> colorList = [
    ColorName("pink", ColorSelectorList.pink),
    ColorName("peach", ColorSelectorList.peach),
    ColorName("mint", ColorSelectorList.mint),
    ColorName("lightBlue", ColorSelectorList.lightBlue),
    ColorName("lightYellow", ColorSelectorList.lightYellow),
    ColorName("lavender", ColorSelectorList.lavender),
    ColorName("lightPeach", ColorSelectorList.lightPeach),
    ColorName("lightMint", ColorSelectorList.lightMint),
    ColorName("pinkRose", ColorSelectorList.pinkRose),
    ColorName("lightGreen", ColorSelectorList.lightGreen),
    ColorName("coral", ColorSelectorList.coral),
    ColorName("skyBlue", ColorSelectorList.skyBlue),
    ColorName("mocha", ColorSelectorList.mocha),
    ColorName("paleLime", ColorSelectorList.paleLime),
    ColorName("pastelYellow", ColorSelectorList.pastelYellow),
    ColorName("lightLavender", ColorSelectorList.lightLavender),
    ColorName("lilac", ColorSelectorList.lilac),
    ColorName("grayBlue", ColorSelectorList.grayBlue),
    ColorName("aqua", ColorSelectorList.aqua),
    ColorName("lightPink", ColorSelectorList.lightPink),
  ];
}

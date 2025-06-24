import 'package:flutter/material.dart';
import 'package:imc_calculator/core/app_colors.dart';
import 'package:imc_calculator/core/app_styles.dart';

class HeightSelector extends StatefulWidget {
  final double value;
  final Function(double) onChange;

  const HeightSelector({
    super.key,
    required this.value,
    required this.onChange,
  });

  @override
  State<HeightSelector> createState() => _HeightSelectorState();
}

class _HeightSelectorState extends State<HeightSelector> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, right: 16),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.backgroundComponent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 16),
              child: Text("Altura", style: TextStyles.bodyText),
            ),
            Text(
              "${widget.value.toStringAsFixed(0)} cm",
              style: TextStyle(fontSize: 38, color: Colors.white),
            ),
            Slider(
              value: widget.value,
              min: 150,
              max: 220,
              onChanged: (value) {
                widget.onChange(value);
              },
              divisions: 70,
              label: "${widget.value.toStringAsFixed(0)}",
              activeColor: AppColors.primary,
            ),
          ],
        ),
      ),
    );
  }
}

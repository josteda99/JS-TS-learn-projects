import 'package:flutter/material.dart';
import 'package:imc_calculator/core/app_colors.dart';
import 'package:imc_calculator/core/app_styles.dart';

class GenderSelector extends StatefulWidget {
  const GenderSelector({super.key});

  @override
  State<GenderSelector> createState() => _GenderSelectorState();
}

class _GenderSelectorState extends State<GenderSelector> {
  String? selectedGender;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () {
              setState(() {
                selectedGender = "Hombre";
              });
            },
            child: Padding(
              padding: const EdgeInsets.only(
                left: 16,
                top: 16,
                bottom: 16,
                right: 8,
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: selectedGender == "Hombre"
                      ? AppColors.backgroundComponentSelected
                      : AppColors.backgroundComponent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    children: [
                      Image.asset("assets/images/male.png", height: 100),
                      SizedBox(height: 8),
                      Text("Male", style: TextStyles.bodyText),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        Expanded(
          child: GestureDetector(
            onTap: () {
              setState(() {
                selectedGender = "Mujer";
              });
            },
            child: Padding(
              padding: const EdgeInsets.only(
                left: 8,
                top: 16,
                bottom: 16,
                right: 16,
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: selectedGender == "Mujer"
                      ? AppColors.backgroundComponentSelected
                      : AppColors.backgroundComponent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    children: [
                      Image.asset("assets/images/female.png", height: 100),
                      SizedBox(height: 8),
                      Text("Female", style: TextStyles.bodyText),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

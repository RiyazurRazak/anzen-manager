import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ignore: must_be_immutable
class SubHeading extends StatelessWidget {
  final String value;
  Color color;
  SubHeading({super.key, required this.value, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: GoogleFonts.inter(
        color: color,
        fontSize: 28,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

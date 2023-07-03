import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ignore: must_be_immutable
class Heading extends StatelessWidget {
  final String value;
  Color color;
  Heading({super.key, required this.value, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: GoogleFonts.inter(
        color: color,
        fontSize: 48,
        fontWeight: FontWeight.w700,
        letterSpacing: 3.0,
      ),
    );
  }
}

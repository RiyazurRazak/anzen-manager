import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SubHeading extends StatelessWidget {
  final String value;
  const SubHeading({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: GoogleFonts.inter(
        color: Colors.black,
        fontSize: 28,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

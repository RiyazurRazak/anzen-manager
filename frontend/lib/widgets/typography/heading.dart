import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Heading extends StatelessWidget {
  final String value;
  const Heading({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: GoogleFonts.inter(
        color: Colors.black,
        fontSize: 48,
        fontWeight: FontWeight.w700,
        letterSpacing: 3.0,
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ignore: must_be_immutable
class Content extends StatelessWidget {
  final String value;
  Color color;
  Content({super.key, required this.value, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: GoogleFonts.inter(
        color: color,
        fontSize: 18,
        fontWeight: FontWeight.w400,
      ),
    );
  }
}

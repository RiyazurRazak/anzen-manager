import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

class ExtensionCard extends StatelessWidget {
  final String label;
  final String datetime;
  final String publicKey;
  final String id;
  const ExtensionCard({
    super.key,
    required this.label,
    required this.datetime,
    required this.publicKey,
    required this.id,
  });

  void onTapHandller() {
    Get.toNamed(
      "/passwords",
      arguments: ["EXT", id, publicKey],
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTapHandller,
      child: Card(
        color: Colors.white,
        elevation: 0,
        margin: const EdgeInsets.only(
          bottom: 18,
        ),
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 1,
          child: Padding(
            padding: const EdgeInsets.all(18.0),
            child: Row(
              children: [
                SvgPicture.network(
                  "https://api.iconify.design/fluent-emoji-flat/laptop.svg?height=120",
                  height: 40,
                  width: 40,
                ),
                SizedBox(width: 18),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Content(
                      value: label,
                    ),
                    Text(
                      "Linked on $datetime",
                      style: GoogleFonts.inter(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

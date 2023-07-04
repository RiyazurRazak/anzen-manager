import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/subheading.dart';

class ExtensionCard extends StatelessWidget {
  final String label;
  final String datetime;
  const ExtensionCard({super.key, required this.label, required this.datetime});

  void onTapHandller() {
    //TODO: navigate to password screen
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
          height: 100,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                SvgPicture.network(
                  "https://api.iconify.design/fluent-emoji-flat/laptop.svg?height=120",
                  height: 120,
                  width: 100,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SubHeading(value: label),
                    Content(
                      value: "Linked on $datetime",
                      color: Colors.grey,
                    )
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

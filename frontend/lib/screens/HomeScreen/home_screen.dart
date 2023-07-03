import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/widgets/panel/device_card.dart';
import 'package:frontend/widgets/panel/extension_card.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/heading.dart';
import 'package:frontend/widgets/typography/subheading.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryBackground,
        forceMaterialTransparency: true,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8.0, top: 16.0),
            child: ElevatedButton(
              onPressed: () {},
              child: Padding(
                padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Content(value: "New Password"),
                    const SizedBox(width: 5),
                    const Icon(
                      Icons.add,
                      color: Colors.black,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
        leading: Padding(
          padding: const EdgeInsets.only(left: 8.0, top: 16.0),
          child: Row(
            children: [
              IconButton(
                iconSize: 32,
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.bars,
                  size: 32,
                ),
              )
            ],
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(12.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Heading(
                  value: "Keep Your\nLife Safe",
                ),
                SizedBox(height: 24),
                SubHeading(value: "My Linked Devices"),
                SizedBox(height: 24),
                DeviceCard(),
                ExtensionCard(
                  label: "Label",
                  datetime: "22/03/22",
                ),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(
          CupertinoIcons.add,
        ),
        label: Content(value: "New Device"),
        isExtended: true,
        backgroundColor: Colors.white,
      ),
    );
  }
}

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
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
                    Content(value: "New Key"),
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
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.settings,
                  size: 28,
                ),
              )
            ],
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Heading(
                  value: "Keep\n   Your  Life\nSafe",
                ),
                const SizedBox(
                  height: 12,
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Content(value: "Add New Device"),
                        const SizedBox(width: 8),
                        const Icon(
                          Icons.add,
                          color: Colors.black,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                const SubHeading(value: "My Linked Devices"),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

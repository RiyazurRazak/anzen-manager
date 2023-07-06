import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:frontend/widgets/panel/device_card.dart';
import 'package:frontend/widgets/panel/extension_card.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/heading.dart';
import 'package:frontend/widgets/typography/subheading.dart';
import 'package:get/get.dart';
import 'package:hive_flutter/hive_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isInit = false;
  void onLeadingPressHandller() {
    Get.toNamed("/about");
  }

  void onActionBtnTapHandller() {
    Get.toNamed("/generate-password");
  }

  void _initBox() async {
    setState(() {
      isInit = false;
    });
    if (!Hive.isBoxOpen(StorageKeys.LINKED_DEVICES)) {
      await Hive.openBox(StorageKeys.LINKED_DEVICES);
    }
    setState(() {
      isInit = true;
    });
  }

  @override
  void initState() {
    _initBox();
    super.initState();
  }

  @override
  void dispose() {
    // Hive.close();
    super.dispose();
  }

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
              onPressed: onActionBtnTapHandller,
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
                onPressed: onLeadingPressHandller,
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
          child: isInit
              ? Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Heading(
                        value: "Keep Your\nLife Safe",
                      ),
                      const SizedBox(height: 24),
                      SubHeading(value: "My Linked Devices"),
                      const SizedBox(height: 24),
                      const DeviceCard(),
                      ValueListenableBuilder(
                        valueListenable:
                            Hive.box(StorageKeys.LINKED_DEVICES).listenable(),
                        builder: (context, box, widget) {
                          // ignore: dead_code
                          for (var i = 0; i < box.length; i++) {
                            var device = box.getAt(i);
                            return ExtensionCard(
                              label: device!.label,
                              datetime:
                                  "${device.linkedOn.day}/${device.linkedOn.month}/${device.linkedOn.year}",
                              publicKey: device.publicKey,
                              id: device.id,
                            );
                          }
                          return Container();
                        },
                      ),
                    ],
                  ),
                )
              : Center(
                  child: CircularProgressIndicator(
                    color: AppColors.splashScreenBackground,
                  ),
                )),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Get.toNamed("/add-device");
        },
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

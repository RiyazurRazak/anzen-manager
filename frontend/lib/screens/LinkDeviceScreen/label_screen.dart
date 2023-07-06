import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:frontend/models/hive/linked_devices.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/heading.dart';
import 'package:get/get.dart';
import 'package:hive_flutter/hive_flutter.dart';

class LabelScreen extends StatefulWidget {
  const LabelScreen({super.key});

  @override
  State<LabelScreen> createState() => _LabelScreenState();
}

class _LabelScreenState extends State<LabelScreen> {
  var labelController = TextEditingController();

  void _saveToDb(String label) async {
    if (label.length < 2) {
      Get.snackbar(
        "Validation Error",
        "Device label must be greater of 2 chars",
        backgroundColor: Colors.white,
      );
      return;
    }
    var box = await Hive.openBox<LinkedDevice>(StorageKeys.LINKED_DEVICES);
    LinkedDevice device = LinkedDevice(
      label: label,
      id: Get.arguments[0]!,
      publicKey: Get.arguments[1]!,
      linkedOn: DateTime.now(),
    );
    await box.add(device);
    Hive.close();
    Get.snackbar(
      "Success",
      "Device Successfully added",
      backgroundColor: Colors.white,
    );
    Get.toNamed("/home");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Heading(value: "Add Label To this device"),
              const SizedBox(height: 24),
              TextField(
                controller: labelController,
                autofocus: true,
                decoration: const InputDecoration(
                  helperText: "Device Label To Identify",
                  hintText: "My Macbook air (chrome)",
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    _saveToDb(labelController.value.text);
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Content(
                      value: "Add Device",
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

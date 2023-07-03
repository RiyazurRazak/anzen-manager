import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/subheading.dart';
import 'package:lottie/lottie.dart';

class DeviceCard extends StatefulWidget {
  const DeviceCard({super.key});

  @override
  State<DeviceCard> createState() => _DeviceCardState();
}

class _DeviceCardState extends State<DeviceCard> {
  String deviceName = "";
  _getDeviceDetails() async {
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    var name = "";
    if (Platform.isAndroid) {
      name = (await deviceInfo.androidInfo).model;
    } else if (Platform.isIOS) {
      name = (await deviceInfo.iosInfo).name;
    }
    setState(() {
      deviceName = name;
    });
  }

  @override
  void initState() {
    _getDeviceDetails();
    super.initState();
  }

  void onTapHandller() {}

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTapHandller,
      child: Card(
        margin: const EdgeInsets.only(
          bottom: 28,
        ),
        color: AppColors.secondaryBackground,
        elevation: 10,
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 1,
          height: 150,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Lottie.network(
                  "https://assets2.lottiefiles.com/private_files/lf30_39yndvy8.json",
                  width: 120,
                  height: 120,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SubHeading(
                      value: "This Device",
                      color: AppColors.secondaryTextColor,
                    ),
                    Content(
                      value: deviceName,
                      color: Colors.white,
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

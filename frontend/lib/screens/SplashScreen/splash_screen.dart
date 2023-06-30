import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:lottie/lottie.dart';
import 'package:uuid/uuid.dart';
import 'package:frontend/constants/lottie_links.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  String _generateSymmetricKey(String stringPool) {
    var uuid = const Uuid();
    stringPool += uuid.v4();
    stringPool = stringPool.replaceAll(' ', '');
    stringPool = stringPool.replaceAll('.', '');
    var pool = stringPool.split('');
    pool.shuffle(Random.secure());
    stringPool = pool.join();
    return stringPool.substring(0, 32);
  }

  void _initApplication(Box box) async {
    var uuid = const Uuid();
    box.put("deviceId", uuid.v4());
    final deviceInfoPlugin = DeviceInfoPlugin();
    const storage = FlutterSecureStorage();
    if (Platform.isIOS) {
      final info = await deviceInfoPlugin.iosInfo;
      String stringPool = "";
      stringPool += info.identifierForVendor!;
      stringPool += info.name;
      stringPool += info.localizedModel;
      stringPool += info.systemName;
      stringPool += info.systemVersion;
      box.put("name", info.name);
      var aesKey = _generateSymmetricKey(stringPool);
      storage.write(key: "aesKey", value: aesKey);
    } else if (Platform.isAndroid) {
      final info = await deviceInfoPlugin.androidInfo;
      String stringPool = "";
      stringPool += info.board;
      stringPool += info.id;
      stringPool += info.brand;
      stringPool += info.product;
      stringPool += info.display;
      box.put("name", info.model);
      var aesKey = _generateSymmetricKey(stringPool);
      storage.write(key: "aesKey", value: aesKey);
    }
  }

  void _checkStatus() async {
    await Hive.openBox(StorageKeys.INIT_STORAGE);
    var initBox = Hive.box(StorageKeys.INIT_STORAGE);
    var deviceId = initBox.get("deviceId");
    if (deviceId == null) {
      _initApplication(initBox);
    }
    Get.offNamed("/home");
  }

  @override
  void initState() {
    _checkStatus();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.splashScreenBackground,
      body: SafeArea(
        child: Center(
          child: Lottie.network(
            LottieLinks.splashScreen,
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_windowmanager/flutter_windowmanager.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:frontend/services/storage/secure_storage.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/heading.dart';
import 'package:frontend/widgets/typography/subheading.dart';
import 'package:get/get.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:local_auth/local_auth.dart';

class AboutScreen extends StatefulWidget {
  const AboutScreen({super.key});

  @override
  State<AboutScreen> createState() => _AboutScreenState();
}

class _AboutScreenState extends State<AboutScreen> {
  String deviceId = "Fetching....";
  String key = "********########^^^^^^^^%%%%%%%%";
  bool isKeyVisible = false;
  void _getData() async {
    await FlutterWindowManager.addFlags(FlutterWindowManager.FLAG_SECURE);
    await Hive.openBox(StorageKeys.INIT_STORAGE);
    var initBox = Hive.box(StorageKeys.INIT_STORAGE);
    var id = initBox.get("deviceId");
    setState(() {
      deviceId = id;
    });
  }

  void getEncryptionKey() async {
    final LocalAuthentication auth = LocalAuthentication();
    final bool didAuthenticate = await auth.authenticate(
      localizedReason: 'Please authenticate to show encryption key',
    );
    if (didAuthenticate) {
      var aesKey = await SecureStorage().read("aesKey");
      setState(() {
        key = aesKey;
        isKeyVisible = true;
      });
    } else {
      Get.snackbar("Error", "Failed To Verify User",
          backgroundColor: Colors.white);
    }
  }

  void hideEncryptionKey() {
    setState(() {
      key = "********########^^^^^^^^%%%%%%%%";
      isKeyVisible = false;
    });
  }

  @override
  void initState() {
    _getData();
    super.initState();
  }

  @override
  void dispose() {
    Hive.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Heading(
                  value: "INFO",
                ),
                const SizedBox(
                  height: 12,
                ),
                SubHeading(value: "Device Id"),
                const SizedBox(
                  height: 8,
                ),
                Content(value: deviceId),
                const SizedBox(
                  height: 12,
                ),
                SubHeading(value: "Encryption Key"),
                const SizedBox(
                  height: 12,
                ),
                Card(
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(40),
                    ),
                  ),
                  elevation: 10,
                  color: AppColors.splashScreenBackground,
                  child: SizedBox(
                    width: MediaQuery.of(context).size.width * 1,
                    child: Padding(
                      padding: const EdgeInsets.only(
                        top: 36,
                        left: 16,
                        right: 16,
                        bottom: 36,
                      ),
                      child: Column(
                        children: [
                          Heading(
                            value: key,
                            color: Colors.white,
                          ),
                          const SizedBox(
                            height: 46,
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width * 1,
                            child: ElevatedButton.icon(
                              onPressed: isKeyVisible
                                  ? hideEncryptionKey
                                  : getEncryptionKey,
                              label: Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Content(
                                  value: isKeyVisible ? "Hide Key" : "Show Key",
                                ),
                              ),
                              icon: Icon(
                                isKeyVisible
                                    ? CupertinoIcons.eye_slash
                                    : CupertinoIcons.eye,
                                color: Colors.black,
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

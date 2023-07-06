import 'package:flutter/material.dart';
import 'package:frontend/constants/api_urls.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:frontend/models/hive/linked_devices.dart';
import 'package:frontend/routes.dart';
import 'package:frontend/screens/SplashScreen/splash_screen.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(LinkedDeviceAdapter());
  await Hive.openBox(StorageKeys.INIT_STORAGE);
  await Hive.openBox(StorageKeys.LINKED_DEVICES);
  await SentryFlutter.init(
    (options) {
      options.dsn = ApiUrls.sentryDsn;
      options.tracesSampleRate = 1.0;
    },
    appRunner: () => runApp(const MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Anzen Manager',
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: AppColors.splashScreenBackground),
        useMaterial3: true,
        fontFamily: GoogleFonts.inter().fontFamily,
      ),
      debugShowCheckedModeBanner: false,
      home: const SplashScreen(),
      getPages: routes,
    );
  }
}

import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/routes.dart';
import 'package:frontend/screens/SplashScreen/splash_screen.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  await Hive.initFlutter();
  runApp(const MyApp());
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

import 'package:frontend/screens/AboutScreen/about_screen.dart';
import 'package:frontend/screens/HomeScreen/home_screen.dart';
import 'package:frontend/screens/SplashScreen/splash_screen.dart';
import 'package:get/get.dart';

List<GetPage> routes = [
  GetPage(
    name: "/splash-screen",
    page: () => const SplashScreen(),
  ),
  GetPage(
    name: "/home",
    page: () => const HomeScreen(),
  ),
  GetPage(
    name: "/about",
    page: () => const AboutScreen(),
  ),
];

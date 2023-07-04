import 'package:frontend/screens/AboutScreen/about_screen.dart';
import 'package:frontend/screens/GeneratePasswordScreen/generate_password_screen.dart';
import 'package:frontend/screens/HomeScreen/home_screen.dart';
import 'package:frontend/screens/LinkDeviceScreen/link_device_screen.dart';
import 'package:frontend/screens/PasswordsScreen/passwords_screen.dart';
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
  GetPage(
    name: "/generate-password",
    page: () => const GeneratePassword(),
  ),
  GetPage(
    name: "/passwords",
    page: () => const PasswordScreen(),
  ),
  GetPage(
    name: "/add-device",
    page: () => const LinkDeviceScreen(),
  ),
];

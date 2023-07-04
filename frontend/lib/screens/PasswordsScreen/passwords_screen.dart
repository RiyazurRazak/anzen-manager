import 'package:flutter/material.dart';
import 'package:azlistview/azlistview.dart';
import 'package:flutter_svg/svg.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/services/api/password_service.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:get/get.dart';

class PasswordScreen extends StatefulWidget {
  const PasswordScreen({super.key});

  @override
  State<PasswordScreen> createState() => _PasswordScreenState();
}

class _PasswordScreenState extends State<PasswordScreen> {
  bool isLoading = true;

  void _getPasswords() async {
    var data = await PasswordService().getAllLabels();
    if (data) {
      //TODO: Format data
    } else {
      Get.snackbar(
        "Error",
        "Something Went Wrong! Try Again",
        backgroundColor: Colors.white,
      );
    }
  }

  @override
  void initState() {
    _getPasswords();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : AzListView(
                data: [],
                itemCount: 5,
                itemBuilder: (context, index) {
                  const label = "";
                  return ListTile(
                    title: Content(value: label),
                    leading: SvgPicture.network(
                      "",
                    ),
                    onTap: () {},
                  );
                },
              ),
      ),
    );
  }
}

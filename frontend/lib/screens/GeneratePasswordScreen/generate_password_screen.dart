import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/services/api/password_service.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/heading.dart';
import 'package:frontend/widgets/typography/subheading.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:sleek_circular_slider/sleek_circular_slider.dart';
import 'package:frontend/utils/generate_password.dart';

class GeneratePassword extends StatefulWidget {
  const GeneratePassword({super.key});

  @override
  State<GeneratePassword> createState() => _GeneratePasswordState();
}

class _GeneratePasswordState extends State<GeneratePassword> {
  String label = "";
  String password = "";
  int passwordLength = 10;
  bool isModalClose = false;

  void savePaswordHandller() async {
    if (label.length < 2) {
      Get.snackbar(
        "Validation Error",
        "Label length Must be greater than 2 chars.",
        backgroundColor: Colors.white,
      );
      return;
    }
    bool isSaved = await PasswordService().save(label, password);
    if (isSaved) {
      Get.snackbar(
        "Success",
        "Password Successfully Assigned",
        backgroundColor: Colors.white,
      );
      Get.toNamed("/home");
    } else {
      Get.snackbar(
        "Error",
        "Something Went Wrong! Try Again",
        backgroundColor: Colors.white,
      );
    }
  }

  void onSavePassword(BuildContext context) {
    showModalBottomSheet(
        backgroundColor: AppColors.primaryBackground,
        context: context,
        builder: (BuildContext context) {
          return Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                Content(value: "Add Label To Proceed"),
                const SizedBox(height: 12),
                TextField(
                  autofocus: true,
                  decoration: const InputDecoration(
                    hintText: "Instagram Password",
                  ),
                  onChanged: (value) {
                    setState(() {
                      label = value;
                    });
                  },
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: savePaswordHandller,
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Content(
                        value: "Finish",
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        });
  }

  @override
  void initState() {
    setState(() {
      password = generateSecurePassword(10);
    });
    super.initState();
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
                  value: "Create Unique Password",
                ),
                const SizedBox(
                  height: 24,
                ),
                Center(
                  child: Lottie.network(
                    "https://assets9.lottiefiles.com/packages/lf20_FGBAVxRGoS.json",
                    height: 80,
                    fit: BoxFit.fitHeight,
                  ),
                ),
                const SizedBox(
                  height: 24,
                ),
                Center(
                  child: SleekCircularSlider(
                    appearance: CircularSliderAppearance(
                      size: 300,
                      infoProperties: InfoProperties(modifier: (value) {
                        return value.ceil().toInt().toString();
                      }),
                    ),
                    onChange: (double value) {
                      int length = value.ceil().toInt();
                      setState(() {
                        passwordLength = length;
                        password = generateSecurePassword(length);
                      });
                    },
                    initialValue: 10,
                    min: 8,
                    max: 18,
                  ),
                ),
                Card(
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(40),
                    ),
                  ),
                  elevation: 10,
                  color: const Color(0XFF273154),
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
                          SubHeading(
                            value: password,
                            color: Colors.white,
                          ),
                          const SizedBox(
                            height: 46,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              ElevatedButton.icon(
                                onPressed: () {
                                  setState(() {
                                    password =
                                        generateSecurePassword(passwordLength);
                                  });
                                },
                                label: Content(
                                  value: "Regenerate",
                                ),
                                icon: const Icon(
                                  CupertinoIcons.refresh_circled_solid,
                                  color: Colors.black,
                                ),
                              ),
                              ElevatedButton.icon(
                                onPressed: () => onSavePassword(context),
                                label: Content(
                                  value: "Save",
                                ),
                                icon: const Icon(
                                  CupertinoIcons.check_mark_circled_solid,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
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

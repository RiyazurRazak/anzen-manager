import 'package:flutter/material.dart';
import 'package:azlistview/azlistview.dart';
import 'package:flutter_svg/svg.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/services/api/password_service.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:frontend/widgets/typography/subheading.dart';
import 'package:get/get.dart';

class _AZItem extends ISuspensionBean {
  final String title;
  final String tag;
  final String icn;
  final String id;

  _AZItem(
      {required this.title,
      required this.tag,
      required this.icn,
      required this.id});

  @override
  String getSuspensionTag() {
    return tag;
  }
}

class PasswordScreen extends StatefulWidget {
  const PasswordScreen({super.key});

  @override
  State<PasswordScreen> createState() => _PasswordScreenState();
}

class _PasswordScreenState extends State<PasswordScreen> {
  bool isLoading = true;
  List<_AZItem> passwords = [];

  void _getPasswords() async {
    // var data = await PasswordService().getAllLabels();
    // if (data) {
    var items = [
      "azure",
      "dribble",
      "aws",
      "instagram",
      "github",
      "facebook",
      "gmail",
      "gcp",
      "reddit",
      "dfadg",
      'adjfhadsf',
      "jsfhduasd",
      "ldjfasd",
      "odfasd",
      "pfgadsger",
      "ajhfuiadhf",
      "iofdaewhyf",
      "tasfasd",
      "kdfgiao"
    ]
        .map(
          (item) => _AZItem(
            title: item,
            tag: item[0].toUpperCase(),
            icn:
                "https://api.iconify.design/solar/lock-password-bold-duotone.svg?height=120",
            id: "",
          ),
        )
        .toList();
    SuspensionUtil.sortListBySuspensionTag(items);
    setState(() {
      passwords = items;
      isLoading = false;
    });
    //TODO: Format data
    // } else {
    //   Get.snackbar(
    //     "Error",
    //     "Something Went Wrong! Try Again",
    //     backgroundColor: Colors.white,
    //   );
    // }
  }

  @override
  void initState() {
    _getPasswords();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Content(
          value: "Passwords",
        ),
        forceMaterialTransparency: true,
      ),
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : AzListView(
                data: passwords,
                itemCount: passwords.length,
                indexBarMargin: const EdgeInsets.all(10),
                indexBarOptions: const IndexBarOptions(
                  needRebuild: true,
                  indexHintAlignment: Alignment.centerRight,
                ),
                indexHintBuilder: (context, hint) {
                  return Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppColors.splashScreenBackground,
                    ),
                    alignment: Alignment.center,
                    child: Content(value: hint, color: Colors.white),
                  );
                },
                itemBuilder: (context, index) {
                  var data = passwords[index];
                  return ListTile(
                    title: Content(value: data.title),
                    leading: SvgPicture.network(
                      data.icn,
                    ),
                    onTap: () {},
                  );
                },
              ),
      ),
    );
  }
}

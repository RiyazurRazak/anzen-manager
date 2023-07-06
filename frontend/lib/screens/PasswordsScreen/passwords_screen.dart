import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:fast_rsa/fast_rsa.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:azlistview/azlistview.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/svg.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/services/api/password_service.dart';
import 'package:frontend/services/signalr/transport_hub.dart';
import 'package:frontend/services/storage/secure_storage.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:get/get.dart';
import 'package:local_auth/local_auth.dart';
import 'package:signalr_netcore/hub_connection.dart';
import '../../models/api/v1/PasswordService/password_label_model.dart';

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
  bool isUpdating = false;
  final requester = Get.arguments;
  HubConnection? hub;

  void _getPasswords() async {
    setState(() {
      isLoading = true;
    });
    var data = await PasswordService().getAllLabels();
    if (data != false) {
      var items = (data as List<PasswordLabel>)
          .map(
            (item) => _AZItem(
              title: item.label!,
              tag: item.label!.toUpperCase(),
              icn: item.icon!,
              id: item.id!,
            ),
          )
          .toList();
      SuspensionUtil.sortListBySuspensionTag(items);
      setState(() {
        passwords = items;
        isLoading = false;
      });
    } else {
      Get.snackbar(
        "Error",
        "Something Went Wrong! Try Again Later",
        backgroundColor: Colors.white,
      );
    }
  }

  void _initHub() async {
    HubConnection hub = await TransportHub().start();
    setState(() {
      this.hub = hub;
    });
  }

  @override
  void initState() {
    _initHub();
    _getPasswords();
    super.initState();
  }

  void _updatePasswordHandller(String id, String label, String password) async {
    if (label.length < 2) {
      Get.snackbar(
        "Validation Error",
        "Password Label must be greater of 2 chars",
        backgroundColor: Colors.white,
      );
      setState(() {
        isUpdating = false;
      });
      return;
    }
    if (password.length < 8) {
      Get.snackbar(
        "Validation Error",
        "Password must be greater of 7 chars",
        backgroundColor: Colors.white,
      );
      setState(() {
        isUpdating = false;
      });
      return;
    }
    bool isUpdated = await PasswordService().update(id, label, password);
    if (isUpdated) {
      setState(() {
        isUpdating = false;
      });
      Get.back();
      _getPasswords();
    } else {
      Get.snackbar(
        "Error",
        "Something Went Wrong! Try Again",
        backgroundColor: Colors.white,
      );
    }
  }

  void longPressHandller(BuildContext context, _AZItem data, index) async {
    final LocalAuthentication auth = LocalAuthentication();
    final bool didAuthenticate = await auth.authenticate(
      localizedReason:
          'Please authenticate to update password for ${data.title}',
    );
    if (!didAuthenticate) {
      Get.snackbar(
        "Failed To verify User",
        "Verify your identity to change passwords",
        backgroundColor: Colors.white,
      );
      return;
    }
    var labelController = TextEditingController();
    var passwordController = TextEditingController();
    labelController.text = data.title;
    showBottomSheet(
      enableDrag: true,
      backgroundColor: AppColors.primaryBackground,
      elevation: 50,
      context: context,
      builder: (BuildContext context) {
        return Padding(
          padding: const EdgeInsets.all(18.0),
          child: SizedBox(
            width: double.infinity,
            height: MediaQuery.of(context).size.height * 0.30,
            child: Column(
              children: [
                Content(value: "Edit Your Password"),
                TextField(
                  controller: labelController,
                  decoration: const InputDecoration(
                    helperText: "Password Label",
                    hintText: "instagram.com",
                  ),
                ),
                const SizedBox(height: 12),
                AutofillGroup(
                  child: TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      helperText: "Password",
                      hintText: "change your password here",
                    ),
                    autofillHints: const [
                      AutofillHints.newPassword,
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      isUpdating = true;
                    });
                    _updatePasswordHandller(
                      data.id,
                      labelController.value.text,
                      passwordController.value.text,
                    );
                  },
                  child: Content(
                    value: isUpdating ? "Updating..." : "Update Password",
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }

  void onPressHandller(_AZItem item) async {
    var data = await PasswordService().get(item.id);
    if (data != false) {
      var cypherText = data["cypher"];
      final LocalAuthentication auth = LocalAuthentication();
      final bool didAuthenticate = await auth.authenticate(
        localizedReason:
            'Please authenticate to access your password for ${item.title}',
      );
      if (!didAuthenticate) {
        Get.snackbar(
          "Error",
          "Authentication required for this process",
          backgroundColor: Colors.white,
        );
        return;
      }
      final aesKey = await SecureStorage().read("aesKey");
      final key = encrypt.Key.fromUtf8(aesKey);
      final iv = encrypt.IV.fromLength(16);
      final builder = encrypt.Encrypter(encrypt.AES(key));
      final password = builder.decrypt64(cypherText, iv: iv);
      if (Get.arguments[0] != "EXT") {
        await Clipboard.setData(
          ClipboardData(
            text: password,
          ),
        );
        Get.snackbar(
          "Copied",
          "Your password is copied to your clipboard",
          backgroundColor: Colors.white,
        );
        return;
      }
      var cypher =
          await RSA.encryptOAEP(password, "", Hash.SHA256, Get.arguments[2]);

      hub!.invoke("GetCypherValue", args: [Get.arguments[1], cypher]);
      Get.snackbar(
        "Success",
        "Password send to device over secure channel",
        backgroundColor: Colors.white,
      );
    } else {
      Get.snackbar(
        "Error",
        "Something Went Wrong! Try Again",
        backgroundColor: Colors.white,
      );
    }
  }

  @override
  void dispose() {
    TransportHub().stop();
    super.dispose();
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
            ? Center(
                child: CircularProgressIndicator(
                    color: AppColors.splashScreenBackground),
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
                  return Dismissible(
                    onDismissed: (direction) {
                      setState(() {
                        passwords.removeAt(index);
                      });
                    },
                    confirmDismiss: (b) async {
                      return await PasswordService().delete(data.id);
                    },
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      padding: const EdgeInsets.all(8.0),
                      child: const Icon(
                        CupertinoIcons.delete,
                        color: Colors.white,
                      ),
                    ),
                    key: Key(data.title),
                    child: ListTile(
                      titleAlignment: ListTileTitleAlignment.center,
                      minLeadingWidth: 46,
                      title: Content(value: data.title),
                      leading: SvgPicture.network(
                        data.icn,
                        height: 22,
                        fit: BoxFit.fitHeight,
                        alignment: Alignment.center,
                      ),
                      onTap: () {
                        onPressHandller(data);
                      },
                      onLongPress: () {
                        longPressHandller(context, data, index);
                      },
                    ),
                  );
                },
              ),
      ),
    );
  }
}

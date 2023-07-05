import 'dart:convert';
import 'dart:io';
import 'package:fast_rsa/fast_rsa.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:frontend/models/hive/linked_devices.dart';
import 'package:frontend/services/signalr/connection_hub.dart';
import 'package:frontend/widgets/typography/content.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:signalr_netcore/hub_connection.dart';

class LinkDeviceScreen extends StatefulWidget {
  const LinkDeviceScreen({super.key});

  @override
  State<LinkDeviceScreen> createState() => _LinkDeviceScreenState();
}

class _LinkDeviceScreenState extends State<LinkDeviceScreen> {
  final qrKey = GlobalKey(debugLabel: "QR");
  QRViewController? controller;
  Barcode? qrData;
  String? extensionId = "";
  String? key = "";
  String? handshakeSecret = "";
  HubConnection? hub;
  String? publicKey;

  void _saveToDb(String label) async {
    var box = await Hive.openBox<LinkedDevice>(StorageKeys.LINKED_DEVICES);
    LinkedDevice device = LinkedDevice(
      label: label,
      id: extensionId!,
      publicKey: publicKey!,
      linkedOn: DateTime.now(),
    );
    await box.add(device);
    Hive.close();
    Get.snackbar(
      "Success",
      "Device Successfully added",
      backgroundColor: Colors.white,
    );
    Get.toNamed("/home");
  }

  void _initHub() async {
    HubConnection hub = await ConnectionHub().start();
    setState(() {
      this.hub = hub;
    });
    hub.on(
      "onLink",
      (arguments) {
        if (arguments!.length == 1) {
          if (arguments[0] == "404") {
            Get.snackbar(
              "Error",
              "Extension is offline! or invalid qrcode",
              backgroundColor: Colors.white,
            );
          }
        }
      },
    );
    hub.on(
      "OnSuccessHandshake",
      (arguments) {
        var labelController = TextEditingController();
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
                    Content(value: "Add Label To this device"),
                    TextField(
                      controller: labelController,
                      decoration: const InputDecoration(
                        helperText: "Device Label To Identify",
                        hintText: "My Macbook air (chrome)",
                      ),
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      onPressed: () {
                        _saveToDb(labelController.value.text);
                      },
                      child: Content(
                        value: "Add",
                      ),
                    )
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  void initState() {
    _initHub();
    super.initState();
  }

  @override
  void dispose() {
    ConnectionHub().stop();
    controller?.dispose();
    super.dispose();
  }

  @override
  void reassemble() async {
    super.reassemble();
    if (Platform.isAndroid) {
      await controller!.pauseCamera();
    }
    controller!.resumeCamera();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: Stack(
          alignment: Alignment.center,
          children: [
            buildQRView(context),
          ],
        ),
      ),
    );
  }

  Widget buildQRView(BuildContext context) => QRView(
        key: qrKey,
        onQRViewCreated: onQRViewCreated,
        overlay: QrScannerOverlayShape(
          cutOutSize: MediaQuery.of(context).size.width * 0.8,
          borderWidth: 10,
          borderLength: 22,
          borderRadius: 10,
          borderColor: AppColors.splashScreenBackground,
        ),
      );

  void onQRViewCreated(QRViewController controller) {
    setState(() {
      this.controller = controller;
    });
    Get.snackbar(
      "Scan To QR From Extension",
      "Follow the steps in the extension to link devices",
      backgroundColor: Colors.white,
      duration: const Duration(seconds: 6),
    );
    String stage = "LINK";
    controller.scannedDataStream.listen(
      (event) async {
        await controller.pauseCamera();
        if (stage == "LINK") {
          stage = "HANDSHAKE";
          await Hive.openBox(StorageKeys.INIT_STORAGE);
          final initBox = Hive.box(StorageKeys.INIT_STORAGE);
          final deviceId = initBox.get("deviceId");
          final deviceName = initBox.get("name");
          Hive.close();
          setState(() {
            extensionId = event.code;
          });
          hub!.invoke("OnLink",
              args: <Object>["${event.code}", "$deviceName", "$deviceId"]);
          await controller.resumeCamera();
        } else if (stage == "HANDSHAKE") {
          var data = jsonDecode(event.code!);
          if (data.containsKey("c") && data.containsKey("v")) {
            var publicKey = data["c"];
            var verifySign = data["v"];
            var key = await RSA.convertJWKToPublicKey(publicKey, "");
            var cypher =
                await RSA.encryptOAEP(verifySign, "", Hash.SHA256, key);
            setState(() {
              this.publicKey = publicKey;
            });
            hub!.invoke("VerifyHandshake", args: [cypher]);
            Get.snackbar(
              "Handshake Verification",
              "Verification process initialized.",
              backgroundColor: Colors.white,
            );
          } else {
            Get.snackbar(
              "Error",
              "invalid qr code",
              backgroundColor: Colors.white,
            );
          }
        }
      },
    );
  }
}

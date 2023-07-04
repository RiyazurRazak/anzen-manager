import 'dart:io';
import 'package:flutter/material.dart';
import 'package:frontend/constants/app_colors.dart';
import 'package:get/get.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class LinkDeviceScreen extends StatefulWidget {
  const LinkDeviceScreen({super.key});

  @override
  State<LinkDeviceScreen> createState() => _LinkDeviceScreenState();
}

class _LinkDeviceScreenState extends State<LinkDeviceScreen> {
  final qrKey = GlobalKey(debugLabel: "QR");
  QRViewController? controller;
  Barcode? qrData;
  var currentStage = "LINK";
  String? extensionId = "";
  String? key = "";
  String? handshakeSecret = "";

  @override
  void initState() {
    super.initState();
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
      )),
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
    controller.scannedDataStream.listen((event) {
      if (currentStage == "LINK") {
        setState(() {
          extensionId = event.code;
          currentStage = "HANDSHAKE";
        });
      } else if (currentStage == "HANDSHAKE") {
        // var data = jsonDecode(event.code!);
        // TODO
      }
    });
  }
}

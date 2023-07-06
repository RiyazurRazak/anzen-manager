import "package:dio/dio.dart";
import "package:frontend/constants/api_urls.dart";
import "package:frontend/constants/storage_keys.dart";
import "package:frontend/services/storage/secure_storage.dart";
import 'package:encrypt/encrypt.dart';
import "package:hive_flutter/hive_flutter.dart";
import "package:sentry_flutter/sentry_flutter.dart";
import "package:frontend/models/api/v1/PasswordService/password_label_model.dart";

class PasswordService {
  final Dio _dio = Dio();

  Future<String> _getLabelIcon(token) async {
    try {
      final response = await _dio
          .get("${ApiUrls.iconifySearchUrl}?query=$token%20fill=1%20palette=1");
      final data = response.data;
      final icon = data["icons"][0] as String;
      final value = icon.split(':');
      return "https://api.iconify.design/${value[0]}/${value[1]}.svg";
    } catch (exception) {
      return "https://api.iconify.design/solar/lock-password-bold-duotone.svg";
    }
  }

  Future<dynamic> getAllLabels() async {
    try {
      await Hive.openBox(StorageKeys.INIT_STORAGE);
      final initBox = Hive.box(StorageKeys.INIT_STORAGE);
      final deviceId = initBox.get("deviceId");
      final response = await _dio.get("${ApiUrls.baseUrl}/passwords/$deviceId");
      List<dynamic> jsonData = response.data as List<dynamic>;
      List<PasswordLabel> labels = [];
      for (var e in jsonData) {
        String iconUrl = await _getLabelIcon(e["label"]);
        e["icon"] = iconUrl;
        labels.add(PasswordLabel.fromJson(e));
      }
      return labels;
    } catch (exception, stackTrace) {
      print(exception);
      Sentry.captureException(
        exception,
        stackTrace: stackTrace,
      );
      return false;
    }
  }

  Future<dynamic> get(String id) async {
    try {
      final response = await _dio.get("${ApiUrls.baseUrl}/password/$id");
      return response.data;
    } catch (exception, stackTrace) {
      Sentry.captureException(
        exception,
        stackTrace: stackTrace,
      );
      return false;
    }
  }

  Future<bool> save(String label, String password) async {
    try {
      await Hive.openBox(StorageKeys.INIT_STORAGE);
      final initBox = Hive.box(StorageKeys.INIT_STORAGE);
      final deviceId = initBox.get("deviceId");
      final aesKey = await SecureStorage().read("aesKey");
      final key = Key.fromUtf8(aesKey);
      final iv = IV.fromLength(16);
      final encrypter = Encrypter(AES(key));
      final cypher = encrypter.encrypt(password, iv: iv);
      await _dio.post(
        "${ApiUrls.baseUrl}/password",
        data: {"deviceId": deviceId, "label": label, "cypher": cypher.base64},
      );
      return true;
    } catch (exception, stackTrace) {
      Sentry.captureException(
        exception,
        stackTrace: stackTrace,
      );
      return false;
    }
  }

  Future<bool> update(String id, String label, String password) async {
    try {
      final aesKey = await SecureStorage().read("aesKey");
      final key = Key.fromUtf8(aesKey);
      final iv = IV.fromLength(16);
      final encrypter = Encrypter(AES(key));
      final cypher = encrypter.encrypt(password, iv: iv);
      await _dio.put(
        "${ApiUrls.baseUrl}/password",
        data: {"id": id, "label": label, "cypher": cypher.base64},
      );
      return true;
    } catch (exception, stackTrace) {
      Sentry.captureException(
        exception,
        stackTrace: stackTrace,
      );
      return false;
    }
  }

  Future<bool> delete(String id) async {
    try {
      await _dio.delete("${ApiUrls.baseUrl}/password/$id");
      return true;
    } catch (exception, stackTrace) {
      Sentry.captureException(
        exception,
        stackTrace: stackTrace,
      );
      return false;
    }
  }
}

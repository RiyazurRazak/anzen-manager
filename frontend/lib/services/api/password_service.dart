import "package:dio/dio.dart";
import "package:frontend/constants/api_urls.dart";
import "package:frontend/constants/storage_keys.dart";
import "package:frontend/services/storage/secure_storage.dart";
import 'package:encrypt/encrypt.dart';
import "package:hive_flutter/hive_flutter.dart";
import "package:sentry_flutter/sentry_flutter.dart";

class PasswordService {
  final Dio _dio = Dio();

  Future<dynamic> getAllLabels() async {
    try {
      await Hive.openBox(StorageKeys.INIT_STORAGE);
      final initBox = Hive.box(StorageKeys.INIT_STORAGE);
      final deviceId = initBox.get("deviceId");
      Hive.close();
      final response = await _dio.get("${ApiUrls.baseUrl}/passwords/$deviceId");
      return response.data;
    } catch (exception, stackTrace) {
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
      Hive.close();
      final aesKey = await SecureStorage().read("aesKey");
      final key = Key.fromUtf8(aesKey);
      final iv = IV.fromLength(16);
      final encrypter = Encrypter(AES(key));
      final cypher = encrypter.encrypt(password, iv: iv);
      await _dio.post(
        "${ApiUrls.baseUrl}/password",
        data: {"deviceId": deviceId, "label": label, "cypher": cypher},
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
}

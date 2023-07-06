import "package:dio/dio.dart";
import "package:frontend/constants/api_urls.dart";
import "package:sentry_flutter/sentry_flutter.dart";

class AccountService {
  final Dio _dio = Dio();

  Future<bool> register(String identifier, String model) async {
    try {
      await _dio.post(
        "${ApiUrls.baseUrl}/device",
        data: {"identifier": identifier, "model": model},
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

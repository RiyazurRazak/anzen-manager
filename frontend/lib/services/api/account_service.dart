import "package:dio/dio.dart";

import "package:frontend/constants/api_urls.dart";

class AccountService {
  final Dio _dio = Dio();

  Future<bool> register(String identifier, String model) async {
    try {
      await _dio.post(
        "${ApiUrls.baseUrl}/device",
        data: {"identifier": identifier, "model": model},
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}

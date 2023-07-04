import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  static const _storageInstance = FlutterSecureStorage();

  write(key, value) async {
    await _storageInstance.write(key: key, value: value);
  }

  read(key) async {
    return await _storageInstance.read(key: key);
  }
}

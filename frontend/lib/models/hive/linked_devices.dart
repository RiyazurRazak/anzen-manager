import 'package:hive_flutter/hive_flutter.dart';

part 'linked_devices.g.dart';

@HiveType(typeId: 1)
class LinkedDevice {
  LinkedDevice({
    required this.label,
    required this.id,
    required this.publicKey,
    required this.linkedOn,
  });

  @HiveField(0)
  late String label;

  @HiveField(1)
  late String id;

  @HiveField(2)
  late String publicKey;

  @HiveField(3)
  DateTime linkedOn;
}

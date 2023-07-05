// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'linked_devices.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class LinkedDeviceAdapter extends TypeAdapter<LinkedDevice> {
  @override
  final int typeId = 1;

  @override
  LinkedDevice read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return LinkedDevice(
      label: fields[0] as String,
      id: fields[1] as String,
      publicKey: fields[2] as String,
      linkedOn: fields[3] as DateTime,
    );
  }

  @override
  void write(BinaryWriter writer, LinkedDevice obj) {
    writer
      ..writeByte(4)
      ..writeByte(0)
      ..write(obj.label)
      ..writeByte(1)
      ..write(obj.id)
      ..writeByte(2)
      ..write(obj.publicKey)
      ..writeByte(3)
      ..write(obj.linkedOn);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is LinkedDeviceAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

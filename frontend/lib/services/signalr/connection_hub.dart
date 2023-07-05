import 'package:frontend/constants/api_urls.dart';
import 'package:frontend/constants/storage_keys.dart';
import 'package:hive/hive.dart';
import 'package:signalr_netcore/hub_connection.dart';
import 'package:signalr_netcore/hub_connection_builder.dart';

class ConnectionHub {
  HubConnection? hubConnection;

  Future<HubConnection> start() async {
    await Hive.openBox(StorageKeys.INIT_STORAGE);
    final initBox = Hive.box(StorageKeys.INIT_STORAGE);
    final deviceId = initBox.get("deviceId");
    Hive.close();
    hubConnection = HubConnectionBuilder()
        .withUrl(
          "${ApiUrls.hubUrl}/connection?amId=$deviceId",
        )
        .build();
    await hubConnection!.start();
    return hubConnection!;
  }

  stop() async {
    await hubConnection!.stop();
  }
}

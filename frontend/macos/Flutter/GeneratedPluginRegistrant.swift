//
//  Generated file. Do not edit.
//

import FlutterMacOS
import Foundation

import device_info_plus
import fast_rsa
import flutter_secure_storage_macos
import package_info_plus
import path_provider_foundation
import sentry_flutter

func RegisterGeneratedPlugins(registry: FlutterPluginRegistry) {
  DeviceInfoPlusMacosPlugin.register(with: registry.registrar(forPlugin: "DeviceInfoPlusMacosPlugin"))
  FastRsaPlugin.register(with: registry.registrar(forPlugin: "FastRsaPlugin"))
  FlutterSecureStoragePlugin.register(with: registry.registrar(forPlugin: "FlutterSecureStoragePlugin"))
  FLTPackageInfoPlusPlugin.register(with: registry.registrar(forPlugin: "FLTPackageInfoPlusPlugin"))
  PathProviderPlugin.register(with: registry.registrar(forPlugin: "PathProviderPlugin"))
  SentryFlutterPlugin.register(with: registry.registrar(forPlugin: "SentryFlutterPlugin"))
}

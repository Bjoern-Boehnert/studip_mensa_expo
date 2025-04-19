## Deploying

Tutorial ohne EAS: https://www.youtube.com/watch?v=M0fX3VpIiN8 https://reactnative.dev/docs/signed-apk-android

Package Scripts
- start:android_development_build: Erstellt eine native Android App als Development Build + Build Tools (Ohne Expo GO) und startet die
    - Generiert die app-debug.apk und installiert die im Emulator
    - Der Prebuild Command aktualisiert den nativen android-Ordner mit App Signing config. Beim --Clean Command ist das App Signing weg!
- start:android_release_build: Erstellt eine native Android App als Release Build und startet die
    - Generiert die app-release.apk und installiert die im Emulator
- generate-playstore-file: Generiert eine AAB Datei für den Google Playstore

# Statuz - Quote Generator App

## Building Android APK

### Prerequisites
- Android Studio installed
- Node.js and npm installed
- Android SDK installed

### Steps to Build APK

1. **Set up Java Environment**
   ```bash
   # Use Android Studio's bundled JDK
   export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
   ```

2. **Clean the Project**
   ```bash
   cd android
   ./gradlew clean
   ```

3. **Build Debug APK**
   ```bash
   ./gradlew assembleDebug
   ```

The generated APK will be located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Troubleshooting

If you encounter Java version compatibility issues:
1. Make sure you're using Android Studio's bundled JDK
2. If using a different JDK, ensure it's Java 17
3. Clean the Gradle cache if needed:
   ```bash
   rm -rf ~/.gradle/caches/
   ```

### Project Structure
- `android/` - Android project files
- `src/` - Source code
- `public/` - Public assets

### Dependencies
- React
- Next.js
- Capacitor
- Android SDK

### Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Android Development
1. Open the project in Android Studio:
   ```bash
   cd android
   open -a "Android Studio" .
   ```

2. Sync project with Gradle files
3. Build and run from Android Studio or use the command line steps above

### Notes
- The app uses WebView to display content
- Network security is configured to allow API access
- JavaScript is enabled in WebView for proper functionality

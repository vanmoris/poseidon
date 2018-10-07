App.info({
  id: 'com.meteor.examples.poseidon',
  name: 'Poseidon',
  version: "0.0.1"
});

App.setPreference("SplashMaintainAspectRatio", true, "android");

// Set up resources such as icons and launch screens.
App.icons({
  // 'android_mdpi': 'public/images/poseidonLogo.png',
  // 'android_hdpi': 'public/images/poseidonLogo.png',
  // 'android_xxhdpi': 'public/images/poseidonLogo.png',
  // 'android_xxxhdpi': 'public/images/poseidonLogo.png',
  // 'android_xhdpi': 'public/images/poseidonLogo.png',
  //
  'android_mdpi': 'public/images/drawable-mdpi/poseidonlogo.9.png',
  'android_hdpi': 'public/images/drawable-hdpi/poseidonlogo.9.png',
  'android_xxhdpi': 'public/images/drawable-xxhdpi/poseidonlogo.9.png',
  'android_xxxhdpi': 'public/images/drawable-xxxhdpi/poseidonlogo.9.png',
  'android_xhdpi': 'public/images/drawable-xhdpi/poseidonlogo.9.png',
  // More screen sizes and platforms...
});

App.launchScreens({
  'android_mdpi_portrait': 'public/images/pl1.png',
  'android_mdpi_landscape': 'public/images/pl1.png',

  // 'android_hdpi_portrait': 'public/images/drawable-hdpi/poseidonlogo.9.png',
  // 'android_hdpi_landscape': 'public/images/drawable-hdpi/poseidonlogo.9.png',
  // 'android_xhdpi_portrait': 'public/images/drawable-xhdpi/poseidonlogo.9.png',
  // 'android_xhdpi_landscape': 'public/images/drawable-xhdpi/poseidonlogo.9.png',
  // 'android_xxhdpi_portrait': 'public/images/drawable-xxhdpi/poseidonlogo.9.png',
  // 'android_xxhdpi_landscape': 'public/images/drawable-xxhdpi/poseidonlogo.9.png',
  //'android_xxxhdpi_portrait': 'public/images/drawable-xxxhdpi/poseidonlogo.9.png',
  //'android_xxxhdpi_landscape': 'public/images/drawable-xxxhdpi/poseidonlogo.9.png',
  // More screen sizes and platforms...
});

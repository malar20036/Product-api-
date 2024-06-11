resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": require.resolve("fs-extra"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib")
    }
  }
  
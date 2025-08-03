module.exports = function override(config) {
    config.resolve.fallback = {
      http: false,
      https: false,
      url: false,
      zlib: false,
      stream: false,
      util: false,
      assert: false,
    };
    return config;
  };
  
'use strict';
var assert = require('assert');

const EnvTagsReplacer = require('./env-tags-replacer');
const envTagsReplacer = new EnvTagsReplacer();

module.exports.validate = function validate(configObject, options) {
  assert(configObject, 'config is not defined');
  const config = envTagsReplacer.replaceEnvTags(configObject, { disableLogs: true });
  assert(config.proxies, 'config.proxies is not defined');
  config.proxies.forEach(function (proxy, index) {
    assert(proxy.name, 'config.proxy[' + index + '].name is not defined');
    assert(proxy.proxy_name, 'config.proxy[' + index + '].proxy_name is not defined');
    assert(proxy.base_path, 'config.proxy[' + index + '].base_path is not defined');
    assert(proxy.target_name, 'config.proxy[' + index + '].proxy_name is not defined');
    assert(proxy.url, 'config.proxy[' + index + '].url is not defined');
    assert(proxy.revision, 'config.proxy[' + index + '].revision is not defined');
    assert(proxy.max_connections, 'config.proxy[' + index + '].max_connections is not defined');
    assert(typeof proxy.max_connections === 'number', 'config.proxy[' + index + '].max_connections is not a number');
  });
  if(!config.edgemicro.hasOwnProperty('enableAnalytics') || config.edgemicro.enableAnalytics === true || options.metrics === true){
    if (config.analytics) {
      assert(config.analytics.uri, 'config.analytics.uri is not defined');
      assert(typeof config.analytics.uri === 'string', 'config.analytics.uri is not a string');
      assert(config.analytics.proxy, 'config.analytics.proxy is not defined');
      assert(config.analytics.proxy === 'dummy', 'config.analytics.proxy is not "dummy"');
      assert(config.analytics.source, 'config.analytics.source is not defined');
      assert(config.analytics.source === 'microgateway', 'config.analytics.source is not "microgateway"');
      assert(config.analytics.proxy_revision, 'config.analytics.proxy_revision is not defined');
      assert(typeof config.analytics.proxy_revision === 'number', 'config.analytics.proxy_revision is not a number');
    }
  }
  if (config.oauth) {
    assert(typeof config.oauth.public_key === 'string', 'config.oauth.public_key is not defined');
  }
  if (config.apikeys) {
    assert(typeof config.apikeys.public_key === 'string', 'config.apikeys.public_key is not defined');
  }
  if (config.oauthv2) {
    assert(typeof config.oauthv2.public_key === 'string', 'config.oauthv2.public_key is not defined');
  }  
  return configObject;
};

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const request = require('requestretry');

const config = require(path.join(__dirname, 'config', 'production'));
const channels = config.twitch.channels;

let pastAlerts = {};

function updateCache () {
  if (Object.keys(channels).length === 0) {
    console.log('No channels specified in config!');
    process.exit(1);
  }

  _.forEach(config.twitch.channels, function (player) {
    return getStreamInfo(player).then(function (result) {
      if (result.stream !== null) {
        if (pastAlerts[result.id] === undefined || pastAlerts[result.id]._id !== result.stream._id) {
          pastAlerts[result.id] = result.stream;
          /*
          Send the Rcon request here
          */
        }
      }
    });
  });
}

updateCache();
setInterval(updateCache, 30 * 1000);

function getStreamInfo (player) {
  return twitchRequest('https://api.twitch.tv/kraken/users?login=' + player).then(function (idResponse) {
    return twitchRequest(`https://api.twitch.tv/kraken/streams/${idResponse.users[0]._id}/`).then(function (streamResponse) {
      const isLive = !!streamResponse.stream;
      return {
        id: idResponse.users[0]._id,
        live: isLive,
        stream: streamResponse.stream
      };
    });
  }).catch(function (error) {
    console.log('error', error);
  });
}

function twitchRequest (url){
  return request({
    url: url,
    json: true,
    fullResponse: false,
    headers: {
      'Client-ID': config.twitch.clientID,
      'Accept': 'application/vnd.twitchtv.v5+json',
    }
  });
}

/**
 * Ranking.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    channel: {type: 'string', columnName: 'Channel'},
    watch_time: {type: 'number', columnName: 'Watch Time (In Minutes)'},
    stream_time: {type: 'number', columnName: 'Stream Time (In Minutes)'},
    avg_viewers: {type: 'number', columnName: "Average Viewers", defaultsTo: 0},
    followers: {type: 'number', columnName: "Followers", defaultsTo: 0},
    followers_gained: {type: 'number', columnName: "Followers Gained", defaultsTo: 0},
    views_gained: {type: 'number', columnName: "Views Gained"},
    partnered: {type: 'boolean', columnName: 'Partnered', defaultsTo: false},
    mature: {type: 'boolean', columnName: 'Mature', defaultsTo: false},
    language: {type: 'string', columnName: 'Language'},
  },

};


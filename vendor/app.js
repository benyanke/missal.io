var app = new Vue({
  el: '#app',
  data: {
    apiIndex: 'https://benyanke.github.io/mymissal.io/data/',
    // apiIndex: 'http://localhost:8080/data/index.json',

    indexContent: [],
    info: [],

    // Set to true to retrieve all texts from local cache when possible
    //
    caching: false,

    // When set to true, will hide incomplete mass texts
    hideIncomplete: true,

    // Will be set to true when index is loaded
    appReady: false

  },
  mounted: function(){
    this.getIndex();
  },

  methods: {
    getIndex: function() {

      // Get index from server
      axios.get(this.apiIndex)
      .then(function (response) {

        // Store data
        app.indexContent = response.data.texts;
        app.info = response.data.info;

        // Set to ready
        app.appReady = true;
        console.log("App loaded.");
        console.log("Index retrieved of " + app.indexContent.length + " texts.");

        app.getLiturgy("lent/ash/wed");
      // })
      //.catch(function (error) {
      //  console.log(error);
      });

    },

    // Gets an object containing the entire liturgy, by it's slug
    getLiturgy: function(slugToLookup) {

      console.log("Getting liturgy by slug '" + slugToLookup + "'")

      // Find the element in the index
      var indexEntry = this.indexContent.find(index => index.slug === slugToLookup);
      console.log(indexEntry);
      file = this.info.hrefBase + indexEntry.href;

      // Look it up by it's found path
      axios.get(file)
      .then(function (response) {
          console.log("Found data for " + response.data.name + ":", response.data);
      });
    },

    // Stores a mass text into the cache
    setCacheValueBySlug: function(slug, content) {

    },

    // Retrieves a mass text into the cache
    getCacheValueBySlug: function(slug) {

    }

  }
})

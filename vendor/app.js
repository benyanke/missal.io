var app = new Vue({
  el: '#app',
  data: {
    // apiIndex: 'https://benyanke.github.io/missal.io/data/',
    apiIndex: 'http://localhost:8080/data/index.json',

    indexContent: [],
    info: [],

    // Set to true to retrieve all texts from local cache when possible
    caching: false,

    // When set to true, will hide incomplete mass texts
    hideIncomplete: true,

    // Will be set to true when index is loaded
    appReady: false,

    // This will be null if no mass is selected
    // if a mass is selected, place it here and it will be rendered
    currentLiturgy: null

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

        
        // app.getLiturgy("lent/1");

      // })
      //.catch(function (error) {
      //  console.log(error);
      });

    },

    // Searches an array of objects for an object with a given key = val
    getElementByKey: function(srcArray, key, value) {
      return srcArray.find(arr => arr[key] === value);
    },

    // Returns title case str
    titleCase: function(str) {
      return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    },

    // Gets an object containing the entire liturgy, by it's slug
    getLiturgy: function(slugToLookup) {

      console.log("Getting liturgy by slug '" + slugToLookup + "'")

      // Check if available in cache first
      cachedValue = this.getCacheValueBySlug(slugToLookup);
      if (cachedValue != null) {
        app.currentLiturgy = cachedValue;
      }

      // Find the element in the index
      var indexEntry = this.indexContent.find(index => index.slug === slugToLookup);
      file = this.info.hrefBase + indexEntry.href;

      // Look it up by it's found path
      axios.get(file)
      .then(function (response) {
          console.log("Found data for " + response.data.name + ":", response.data);
          app.currentLiturgy = response.data;
      })
      .catch(function (error) {
        console.log("HTTP error: ", error);
      });


    },

    // Stores a mass text into the cache
    setCacheValueBySlug: function(slug, content) {

    },

    // Retrieves a mass text into the cache
    // Returns null if cached value is expired or not existing
    getCacheValueBySlug: function(slug) {
        return null;
    }

  }
})

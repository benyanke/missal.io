var app = new Vue({
  el: '#app',
  data: {
    // apiIndex: 'https://benyanke.github.io/missal.io/data/',
    apiIndex: 'https://www.missal.io/api/',
    // apiIndex: 'http://localhost:8080/data/index.json',
    // apiIndex: 'http://localhost:8085/data/index.json',

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
    currentLiturgy: null,

    // Selecting the language to use by default
    lang: "en",

  },
  mounted: function(){
    this.getIndex();
    this.hotkeyListener();
  },

  methods: {

    // Scrolls the window to the top
    scrollToTop: function() {
        window.scrollTo(0,0);
    },

    // Setup controls for the nav bar
    setupNavHandler: function() {
       $('#navbarResponsive').collapse({
          toggle: false
       });

    },

    // Function to hide and show nav
    navHide: function() {
        $('#navbarResponsive').collapse('hide');
    },

    // Function to hide and show nav
    navShow: function() {
        $('#navbarResponsive').collapse('show');
    },

    // Setup listeners for hotkeys
    hotkeyListener: function() {

      window.addEventListener('keyup', function(event) {

        // escape key => clear liturgy
        if (event.keyCode == 27) {
          app.clearLiturgy();
        }

        // left arrow key => clear liturgy
        if (event.keyCode == 37) {
          app.clearLiturgy();
        }

      });

    },

    // Clear currently selected liturgy and return to index
    clearLiturgy: function() {
        app.scrollToTop();
        app.currentLiturgy = null;
    },

    // Triggered on button press on index page
    liturgySelectHandler: function(slug) {

        app.getLiturgy(slug);

    },

    // Set the global language to use ()
    setLang: function(newLang) {
      app.lang = newLang;
      // TODO: finish implementing me
    },

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

      // })
      //.catch(function (error) {
      //  console.log(error);
      });

    },

    // Searches an array of objects for an object with a given key = val
    getElementByKey: function(srcArray, key, value) {

      return srcArray.find(arr => arr[key] === value);

    },

    // Convert array into str
    arrayHandler: function(arr) {

      if(Array.isArray(arr)) {
        return arr.join('<br /><br />')
      }

      return arr;

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
        app.scrollToTop();
        app.currentLiturgy = cachedValue;
      }

      // Find the element in the index
      var indexEntry = this.indexContent.find(index => index.slug === slugToLookup);
      file = this.info.hrefBase + indexEntry.href;

      // Look it up by it's found path
      axios.get(file)
      .then(function (response) {
          console.log("Found data for " + response.data.name + ":", response.data);
          app.scrollToTop();
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

var app = new Vue({
  el: '#app',
  data: {
    apiIndex: 'https://benyanke.github.io/mymissal.io/data/',
    indexContent: 'Hello Vue!',

    // Set to true to retrieve all texts from local cache when possible
    //
    caching: false,

    // Will be set to true when index is loaded
    appReady: false

  },
  methods: {
    mounted:function(){
      this.getIndex();
      // this.appReady = true;
    },
    getIndex: function() {
      // this.apiIndex;
      // this.appReady = true;
    },

    // Gets an object containing the entire liturgy, by it's slug
    getLiturgy: function(slug) {

    },

    // Stores a mass text into the cache
    setCacheValueBySlug: function(slug, content) {

    },

    // Retrieves a mass text into the cache
    getCacheValueBySlug: function(slug) {

    }

  }
})

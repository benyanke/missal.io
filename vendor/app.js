var app = new Vue({
  el: '#app',
  data: {
    apiIndex: 'https://benyanke.github.io/mymissal.io/data/',

    indexContent: [],
    info: [],

    // Set to true to retrieve all texts from local cache when possible
    //
    caching: false,

    // Will be set to true when index is loaded
    appReady: false

  },
  mounted: function(){
    this.getIndex();
  },

  methods: {
    getIndex: function() {
      axios.get(this.apiIndex)
      .then(function (response) {

        this.indexContent = response.data.texts;
        this.info = response.data.info;

        this.appReady = true;
      })
      .catch(function (error) {
        console.log(error);
      });

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

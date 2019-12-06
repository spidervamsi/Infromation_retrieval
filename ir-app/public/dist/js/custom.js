var pois = ["KamalaHarris","AOC","narendramodi","jairbolsonaro","AmitShah","ewarren","Haddad_Fernando","rajnathsingh","CarlosBolsonaro","ArvindKejriwal","jose_simao","Swamy39","gleisi","Nidhi","ManuelaDavila","BernieSanders","jeanwyllys_real","JoeBiden","JohnJHarwood","cirogomes","MarinaSilva","dilmabr","PeteButtigieg","yadavakhilesh","HillaryClinton","myogiadityanath","BolsonaroSP","LulaOficial","SenSanders","RahulGandhi","nsitharaman","FlavioBolsonaro","BarackObama"]

// Initialize page content
generateFacetFilters();
$("#kibana-content").hide();
$("#news-content").hide();
$("#facets").hide();
populateTweetTable();
populateNewsTable();


$("#search-tweets-button").click(function(){
  var query = $("#tweet-query").val();

  if(query == "") {
    $("#tweet-table").hide();
    alert("Empty query!");
  } else {
    $("#tweet-table").show();
    performTweetSearch(query);
  }
  
});

$("#search-news-button").click(function(){
  var query = $("#news-query").val();

  if(query == "") {
    $("#news-table").hide();
    alert("Empty query!");
  } else {
    $("#news-table").show();
    performNewsSearch(query);
  }
  
});

function generateFacetFilters() {

  
}

function populateTweetTable() {
    $('#tweet-table').bootstrapTable({
        pagination: true,
        columns: [{
          field: 'user',
          title: 'Twitter User'
        }, {
          field: 'tweet',
          title: 'Tweet'
        }, {
            field: 'language',
            title: 'Language'
        }, { 
          field: 'sentiment',
          title: 'Sentiment'
        }, {
          field: 'topic',
          title: 'Topic' 
        }, {
           field: 'url',
           title: 'View Tweet'
        }]
      })
      $('#tweet-table').hide();
}

function populateNewsTable() {
$('#news-table').bootstrapTable({
    pagination: true,
    columns: [{
      field: 'news_title',
      title: 'Title'
    }, {
      field: 'news_link',
      title: 'Link'
    }]
  })
  $('#news-table').hide();
}

function viewAnalytics() {
    $("#search-content").hide();
    $("#kibana-content").show();
    $("#news-content").hide();
    $("#facets").hide();
}

function viewSearch() {
    $("#search-content").show();
    populateTweetTable();
    $("#tweet-table").hide();
    $("#kibana-content").hide();
    $("#news-content").hide();
    $("#facets").show();
}

function viewNewsArticles() {
    $("#search-content").hide();
    populateNewsTable();
    $("#news-table").hide();
    $("#kibana-content").hide();
    $("#news-content").show();
    $("#facets").hide();
}

function constructQuery() {

}

function performTweetSearch() {

  var query = constructQuery();

  var data = [{
    user: 'BarackObama',
    tweet: 'Hello',
    language: 'English',
    sentiment: 'Positive',
    topic: 'General',
    url: 'URL'
  }];

  $('#tweet-table').bootstrapTable('load', data);

}

function performNewsSearch() {

  var data = [{
    news_title: 'US Celebrates Thanksgiving',
    news_link: 'www.google.com',
  }];

  $('#news-table').bootstrapTable('load', data);
}
var pois = [
  "narendramodi",
  "rajnathsingh",
  "Nidhi",
  "ArvindKejriwal",
  "Swamy39",
  "KamalaHarris",
  "JohnJHarwood",
  "BernieSanders",
  "JoeBiden",
  "ewarren",
  "jose_simao",
  "ManuelaDavila",
  "Haddad_Fernando",
  "gleisi",
  "jeanwyllys_real",
  "AmitShah",
  "yadavakhilesh",
  "AOC",
  "HillaryClinton",
  "jairbolsonaro",
  "dilmabr",
  "MarinaSilva"
]

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
  var el = document.querySelector('#poi-facets');
  pois.forEach((element, index) => {
    var li = '<li class="nav-item"> \
      <div class="form-check nav-link" style="padding-left:50px"> \
          <input id="poi-facets-chk-'+index+'" data-id="poi_name" data-value="'+element+'" onchange="checkBoxChange(this)"\
          class="form-check-input" type="checkbox" id="gridCheck'+index+'"> \
          <label class="form-check-label" for="poi-facets-chk-'+index+'"> \
            '+element+' \
          </label> \
      </div> \
    </li>';
    var div = document.createElement('div');
    div.innerHTML = li.trim();
    el.appendChild(div.firstChild);
  }) 
}

var filters = {
  poi_name: [],
  country: [],
  lang: [],
  sentiment: [],
  topic: []
}

function checkBoxChange(element){
  var id = element.getAttribute('data-id');
  var val = element.getAttribute('data-value');
  if(element.checked){
    filters[id].push(val);
  }
  else{
    filters[id].splice(filters[id].indexOf(val), 1);
  }
  console.log(filters);
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

function constructQuery(search_query) {
  //"&&poi:modi,obama&&country:India"
  var queryString = "";
  Object.keys(filters).forEach((key) => {
    if(filters[key].length > 0){
      queryString += " && "+key+":";
      let length = filters[key].length;
      filters[key].forEach((values, index) => {
        if(index+1 < length)
          queryString += values + ",";
        else
          queryString += values
      })
    }
  });
  return search_query + queryString;
}

function performTweetSearch(search_query) {

  var query = constructQuery(search_query);
  console.log(query);

  $.post("/getTweets",
  {
    query: query
  },
  function(data, status){

    var table_data = []
    console.log(data, status);
    var result_docs = data.response.docs;

    result_docs.forEach((doc, index) => {
	let sent = "Neutral";
      if(doc['sentiment']>0){
sent = "Positive";
	}
else if(doc['sentiment'] < 0){
sent = "Negative";
}
else
sent = "Neutral";
if(doc['topic'] == 'Neutral')
doc['topic'] = "General";
      table_data.push({
        user: doc["poi_name"],
        tweet: doc["tweet_text"],
        language: doc["lang"],
        sentiment: sent,
        topic: doc["topic"],
        url: "<a href='https://twitter.com/" + doc["poi_name"] + "/status/" + doc["id"] + "'>Tweet link</a>" 
      });
    });

    $('#tweet-table').bootstrapTable('load', table_data);
  });


  

}

function performNewsSearch(query) {

  var data = [{
    news_title: 'US Celebrates Thanksgiving',
    news_link: 'www.google.com',
  }];


$.post("/getNews",
  {
    query: query
  },
  function(data, status){

    var table_data = []
    console.log(data, status);
    var result_docs = data.response.docs;

    result_docs.forEach((doc, index) => {
      
	table_data.push({
        news_title: doc["title"],
        news_link: "<a href='" + doc["url"] +"'>News link</a>"
      });
    });

    $('#news-table').bootstrapTable('load', table_data);
  });

}

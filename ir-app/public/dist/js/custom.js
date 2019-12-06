
// Initialize page content
$("#kibana-content").hide();
$("#news-content").hide();
$("#facets").hide();
populateTweetTable();
populateNewsTable();

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
      field: 'news title',
      title: 'Title'
    }, {
      field: 'news link',
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
    $("#kibana-content").hide();
    $("#news-content").hide();
    $("#facets").show();
}

function viewNewsArticles() {
    $("#search-content").hide();
    $("#kibana-content").hide();
    $("#news-content").show();
    $("#facets").hide();
}
/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
function parseRSS(url, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.title)+'</h2>');

      $.each(data.responseData.feed.entries, function(key, value){
        var thehtml = '<h3><a href="'+value.link+'" target="_blank">'+value.title+'</a></h3>';
        var moreInfo = '<pre><h4>Author: &#9&#9 </pre>'+value.author+
                      '<pre><br/>Category: &#9 </pre>'+value.categories+
                      '<pre><br/>Description: &#9 </pre>'+value.content+'</h4><br/>';
        $(container).append(thehtml);
        $(container).append(moreInfo);
      });
    }
  });
}

function firstRSS(url, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
      dataType: 'json',
      success: function(data) {
        $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.title)+'</h2>');
        value = data.responseData.feed.entries[0];
        var thehtml = '<h3><a href="'+value.link+'" target="_blank">'+value.title+'</a></h3>';
        var moreInfo = '<h4>Author: '+value.author+
                      '<br/>Category: '+value.categories+
                      '<br/>Description: '+value.content+'</h4><br/>';
        $(container).append(thehtml);
        $(container).append(moreInfo);
        $(container).append(data.responseData.feed.entries.length)
      }
  });
}

function nextRSS(url, container) {
  if (typeof(nextRSS.counter == 'undefined')){
    nextRSS.counter = 0;
  }
  nextRSS.counter++;

  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
      dataType: 'json',
      success: function(data) {
        $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.title)+'</h2>');
        value = data.responseData.feed.entries[nextRSS.counter];
        var thehtml = '<h3><a href="'+value.link+'" target="_blank">'+value.title+'</a></h3>';
        var moreInfo = '<h4>Author: '+value.author+
                      '<br/>Category: '+value.categories+
                      '<br/>Description: '+value.content+'</h4><br/>';
        $(container).append(thehtml);
        $(container).append(moreInfo);
        $(container).append(data.responseData.feed.entries.length)
      }
  });
}

/**
 * Capitalizes the first letter of any string variable
 * source: http://stackoverflow.com/a/1026087/477958
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

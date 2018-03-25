// Listener

document.getElementById('myForm').addEventListener('submit', saveBookmark);


function saveBookmark(event){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if(!validateForms(siteName, siteURL)){
    return false;
  }

  var bookmark = {
     name: siteName,
     url: siteURL
  }
// test if bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
 // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // adding a new bookmark
    bookmarks.push(bookmark);
    // resetting localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
// clear form
   document.getElementById('myForm').reset();

  // re-fetchBookmarks
    fetchBookmarks();

  // prevent form from submitting
  event.preventDefault();
}
//deleteBookmark

function deleteBookmark(url){
  //get bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


// Re-fetch bookmarks
fetchBookmarks();
}

// fetch bookmarks

function fetchBookmarks(){
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   // get output

   var bookmarksResult = document.getElementById('bookmarksResult');


   bookmarksResult.innerHTML = '';

   for(var i = 0; i < bookmarks.length; i++){
     var name = bookmarks[i].name;
     var url = bookmarks[i].url;


     bookmarksResult.innerHTML += '<div class="container">'+'<div class="jumbotron">'+
                                    '<h3>'+name+
                                    '  <a class="btn btn-primary" target="_blank" href="'+url+'">visit</a>'+
                                    '  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">delete</a>'+

                                    '</h3>'+
                                    '</div>'+
                                    '</div>';
   }

}

// form validations
function validateForms(siteName, siteURL){
  if(!siteName || !siteURL){
    alert('Please Fill the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteURL.match(regex)){
    alert('please use a valid url');
    return false;
  }
  return true;
}

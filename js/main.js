document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    };

    if (localStorage.getItem("bookmarks") === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    document.getElementById("myForm").reset();

    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults = document.getElementById("bookmarksResults");
    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=
            '<div class="well">' +
            "<h4>" +
            name +
            ' <a class="btn btn-primary btn-sm" target="_blank" href="' +
            addhttp(url) +
            '">Visit</a> ' +
            " <a onclick=\"deleteBookmark('" +
            url +
            '\')" class="btn btn-danger btn-sm" href="#">Delete</a> ' +
            "</h4>" +
            "<hr/>";
        ("</div>");
    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }

    var expression =
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
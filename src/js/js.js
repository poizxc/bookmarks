function Bookmark(name, url, type) {
    this.name = name;
    this.url = url;
    this.type = type;

};
const website = document.querySelector("#website");
const websiteUrl = document.querySelector("#website-url");
let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')) || [];
let delButtons;
for (var i = bookmarkList.length - 1; i >= 0; i--) {
    bookmarkList[i] = new Bookmark(bookmarkList[i].name, bookmarkList[i].url, bookmarkList[i].type);
}
Bookmark.prototype.delete = function() {
    bookmarkList.remove(bookmarkList.indexOf(this));
}
Bookmark.prototype.alertType = function() {
    switch (this.type) {
        case 'other':
            return 'secondary';
        case 'fun':
            return 'success';
        default:
            return "info";
    }
}
Bookmark.prototype.show = function(element) {
    let b = document.createElement('div')
    b.className = `alert alert-${this.alertType()}`;
    b.innerHTML = `<h4><a href="${this.url}">${this.name}</a> <button class="btn btn-danger todelete" data-delete-number="${bookmarkList.indexOf(this)}">delete</button></h4>`;
    element.append(b)
};

function handleDelete() {
    bookmarkList.splice(this.dataset.deleteNumber, 1);
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    init();
}
const handleSubmit = e => {
    let input = document.querySelector("[name=type-of-bookmark]:checked");
    e.preventDefault();
    bookmarkList = [...bookmarkList, new Bookmark(website.value, websiteUrl.value, input.value)];
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    init();
};

function handleReset(e) {
    e.preventDefault();
    localStorage.removeItem('bookmarkList');
    bookmarkList = [];
    init();
};
document.querySelector("#add-bookmark").addEventListener("submit", handleSubmit);
document.querySelector("#reset").addEventListener("click", handleReset);




function init() {
    document.querySelector("#bookmarks").innerHTML = "";
    bookmarkList.forEach(bookmark => bookmark.show(document.querySelector("#bookmarks")))
    delButtons = document.querySelectorAll(".todelete");
    delButtons.forEach(btn => btn.addEventListener("click", handleDelete));
}


init();
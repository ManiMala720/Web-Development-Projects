const bookmarkName = document.getElementById("bookmark-name");
const bookmarkURL = document.getElementById("bookmark-url")
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");

const loadBookmarks = () => {
  getBookmarks().forEach(addBookmarks);
}

document.addEventListener('DOMContentLoaded',loadBookmarks);

addBookmarkBtn.addEventListener('click',function(){
  const name = bookmarkName.value.trim();
  const url = bookmarkURL.value.trim();
  if(!name || !url){
    alert("Please enter both name and url");
    return;
  }
  else{
    if(!url.startsWith('http://') && !url.startsWith('https://')){
      alert("Enter a valid url starting with http or https");
      return;
    }
  }
  const bookmark = { name,url};
  const newBookmark = getBookmarks();
  const isExist = newBookmark.some(bookmark => {
    return bookmark.name.toLowerCase()==name.toLowerCase() && bookmark.url==url;
  });
  if(isExist){
    alert("Bookmark already exist");
    return;
  }
  addBookmarks(bookmark);
  newBookmark.push(bookmark);
  saveBookmarks(newBookmark);
  bookmarkName.value = "";
  bookmarkURL.value = "";
})

const addBookmarks = ({name,url}) => {
  const listItem = document.createElement("li");
  const linkItem = document.createElement("a");
  const removeBtn = document.createElement("button");
  linkItem.href = url;
  linkItem.target = "_blank";
  linkItem.textContent = name;
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener('click',function(){
    listItem.remove();
    const updateBookmark = getBookmarks().filter(bookmark => {
      return bookmark.name!==name || bookmark.url!==url
    });
    saveBookmarks(updateBookmark);
  });
  listItem.appendChild(linkItem);
  listItem.appendChild(removeBtn);
  bookmarkList.appendChild(listItem);
}

const getBookmarks = () => {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

const saveBookmarks = (bookmark) => {
  localStorage.setItem("bookmarks",JSON.stringify(bookmark));
}




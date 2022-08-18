/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"54pZXajkIU1ZHf8T","label":"social media","bookmarks":[{"id":"Jk8HzhWkArerDbPk","label":"youtube","url":"https://www.youtube.com/"},{"id":"6NjdHdSS13HyxE9s","label":"facebook","url":"https://www.facebook.com/"},{"id":"H9NwqbYVyIwIlaFT","label":"instagram","url":"https://www.instagram.com/"},{"id":"7nzQlBoCyM82EglA","label":"whatsapp","url":"https://web.whatsapp.com/"}]},{"id":"uZESxjBnEioxRHkO","label":"design tools","bookmarks":[{"id":"Oq1tg9cnNTzqPrLM","label":"figma","url":"https://www.figma.com"},{"id":"LoIDUEbJ6TkSF476","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"gDeSeukr1zEUPOL8","label":"haikei","url":"https://app.haikei.app/"},{"id":"PbTXJPJEo9MCjEFL","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"WvnWPFIyl6qMORW2","label":"worth reading","bookmarks":[{"id":"K0esvpvVPYlAbX2Z","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"7XmrOGvJ04Snsqbu","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"FcQXGxEjUJZRojQi","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()

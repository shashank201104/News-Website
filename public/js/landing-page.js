const key = "bef9d942fce2430ab237ac6620c4ed1c";
const url = "https://newsapi.org/v2/everything?q=";

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll("nav ul li");
  const newsContainer = document.querySelector(".card-container");
  const searchtext=document.getElementById("search-text")

  categories.forEach((category) => {
    category.addEventListener("click", async () => {
      const query = category.getAttribute("data-query");
      const response = await fetch(`/news?category=${query}`);
      const data = await response.json();
      loaddata(data.articles);
    });
  });

  searchtext.addEventListener("submit", async () => {
      const queryInput = document.getElementById("search-query");
      event.preventDefault();

      const query = queryInput.value.trim();
      if (!query) return;
      try {
        const response = await fetch(`${url}${query}&apiKey=${key}&lang=en`);
        const data = await response.json();
        loaddata(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

  function loaddata(articles) {
    let container = document.querySelector(".card-container");
    container.innerHTML = "";
    articles.forEach((article) => {
      if (!article.urlToImage) {
        return;
      }
      let card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<a href="${article.url}">
    <img src="${article.urlToImage}" class="lazyload" alt="">
    <p class="card-heading">${article.title}</p>
    <p class="card-para">${article.description}</p>
    </a>`;

      container.appendChild(card);
    });
  }

  (async () => {
    const response = await fetch(`/news?category=india`);
    const data = await response.json();
    loaddata(data.articles);
  })();

  let scrolltime;
  newsContainer.addEventListener("scroll",()=>{
      newsContainer.classList.add("scrolling")
      clearTimeout(scrolltime);
      scrolltime=setTimeout(()=>{
        newsContainer.classList.remove("scrolling");
      },500)
  })

  const btn=document.querySelector(".hamburger");
  btn.addEventListener('click',()=>{
    document.querySelector(".navbar ul").classList.toggle("side-ul")
    document.querySelectorAll(".navbar ul li").forEach(li => {
        li.classList.toggle('side-ul-li')
    });
  })
});

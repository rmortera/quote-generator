const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x-twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();

  const apiURL = "https://dummyjson.com/quotes?limit=0";

  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    quotes = data.quotes;
    newQuote();
  } catch (error) {
    alert(error.message);
  }
}
getQuotes();

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.quote.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.quote;
  removeLoadingSpinner();
}

// Tweet a quoteArr
function postQuote() {
  const xUrl = `https://twitter.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(xUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", newQuote);
xBtn.addEventListener("click", postQuote);

const bookContainer = document.getElementById("book-container");
const cardContainer = document.getElementById("card-container");
const displayBooks = document.getElementById("books");
const displayCard = document.getElementById("card");
const addedToCard = [];

// render all the books
const getBookData = function (addedToCard) {
   fetch("https://striveschool-api.herokuapp.com/books", {})
      .then((response) => {
         console.log("this is fetch response: ", response);

         //  validate response is okay or not. which is a bool value
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("There's an Error in response");
         }
      })
      .then((data) => {
         console.log("data received!", data);

         data.forEach((book) => {
            const bookContent = document.createElement("div");
            bookContent.classList.add("col-4", "align-self-stretch", "my-3");
            bookContent.innerHTML = `
                <div class="card ">
                  <img src="${book.img}" class="card-img-top " alt="cover-${book.title}" />
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">
Price: € ${book.price}
                      </p>
                  </div>
                </div>
          `;

            // creating descard and add to card buttons
            const cardButtons = bookContent.querySelector(".card-body");
            const btnDiscard = document.createElement("button");
            btnDiscard.classList.add("btn", "btn-danger", "me-2");
            btnDiscard.innerText = "Discard";
            const btnAddToCard = document.createElement("button");
            btnAddToCard.classList.add("btn", "btn-success");
            btnAddToCard.innerText = "Add to Card";

            cardButtons.appendChild(btnDiscard);
            cardButtons.appendChild(btnAddToCard);
            bookContainer.appendChild(bookContent);

            // display none when clicked on discard button
            btnDiscard.addEventListener("click", () => {
               //  console.log(`clicked on ${book.title}`);
               //  fetch(`https://striveschool-api.herokuapp.com/books`, {
               //     method: "DELETE",
               //  }).then((response) => response.json());
               bookContent.style.display = "none";
            });

            // add to card
            btnAddToCard.addEventListener("click", () => {
               //  remove from the card
               console.log("before remove: ", addedToCard);
               if (btnAddToCard.innerText === "Added") {
                  addedToCard.forEach((cardbook, i) => {
                     if (cardbook.asin === book.asin) {
                        addedToCard.splice(i, 1);
                        btnAddToCard.innerText = "Add to Card";
                        btnAddToCard.classList.remove("btn-warning");
                        console.log("romoved: ", addedToCard);
                     }
                  });
               } else {
                  // add to card
                  addedToCard.push(book);
                  btnAddToCard.innerText = "Added";
                  btnAddToCard.classList.add("btn-warning");
                  console.log("added: ", addedToCard);
               }
               addedBooksToCard(addedToCard);
            });
         });
      })
      .catch((err) => {
         console.log("fetch Error!", err);
      });
};

// discard/delete book
const addedBooksToCard = function (addedToCard) {
   console.log(addedToCard);
   addedToCard.forEach((book) => {
      const bookContent = document.createElement("div");
      bookContent.classList.add("col-4", "align-self-stretch", "my-3");
      bookContent.innerHTML = `
        <div class="card ">
          <img src="${book.img}" class="card-img-top " alt="cover-${book.title}" />
          <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">
Price: € ${book.price}
              </p>
          </div>
        </div>
  `;

      // creating descard and add to card buttons
      const cardButtons = bookContent.querySelector(".card-body");
      const btnDiscard = document.createElement("button");
      btnDiscard.classList.add("btn", "btn-danger", "me-2");
      btnDiscard.innerText = "Discard";
      const btnAddToCard = document.createElement("button");
      btnAddToCard.classList.add("btn", "btn-success");
      btnAddToCard.innerText = "Add to Card";

      cardButtons.appendChild(btnDiscard);
      cardButtons.appendChild(btnAddToCard);
      cardContainer.appendChild(bookContent);

      // display none when clicked on discard button
      // btnDiscard.addEventListener("click", () => {
      //    //  console.log(`clicked on ${book.title}`);
      //    //  fetch(`https://striveschool-api.herokuapp.com/books`, {
      //    //     method: "DELETE",
      //    //  }).then((response) => response.json());
      //    bookContent.style.display = "none";
      // });

      // add to card
      // btnAddToCard.addEventListener("click", () => {
      //    //  remove from the card
      //    console.log("before remove: ", addedToCard);
      //    if (btnAddToCard.innerText === "Added") {
      //       addedToCard.forEach((cardbook, i) => {
      //          console.log("array:", cardbook.title, " books: ", book.title);
      //          if (cardbook.asin === book.asin) {
      //             addedToCard.splice(i, 1);
      //             console.log("after: ", addedToCard);
      //             btnAddToCard.innerText = "Add to Card";
      //             btnAddToCard.classList.remove("btn-warning");
      //          }
      //       });
      //    } else {
      //       // add to card
      //       addedToCard.push(book);
      //       btnAddToCard.innerText = "Added";
      //       btnAddToCard.classList.add("btn-warning");
      //    }
      // });
   });
};

getBookData(addedToCard);
// addedBooksToCard(addedToCard);
card.style.display = "none";
books.style.display = "block";

document.getElementById("btn-home").addEventListener("click", function () {
   console.log("clicked home");
   books.style.display = "block";
   card.style.display = "none";
});
document.getElementById("btn-card").addEventListener("click", function () {
   console.log("clicked card");
   books.style.display = "none";
   card.style.display = "block";
});

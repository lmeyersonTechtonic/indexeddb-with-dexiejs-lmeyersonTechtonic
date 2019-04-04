function onDatabaseReady() {
    populateTableUI() // DO NOT TOUCH THIS LINE until step #4

    console.log(db);
    // DexieJS docs: https://dexie.org/
}


function deleteBook(event) {
  db.books.delete(event)
    // .where("title").equals(event).delete()
    .then(function(deleted) {
      console.log(`${event} deleted.`);
  });
  //strip out table and rerender
  document.querySelector("tbody").innerHTML = "";
  populateTableUI();
}

function addBook(event) {
  event.preventDefault()
  if (document.querySelector("#inputTitle").value) {
    const newBook = db.books.put({
      title: document.querySelector("#inputTitle").value,
      author: document.querySelector("#inputAuthor").value,
      numberOfPages: document.querySelector("#inputPages").value,
      cover: document.querySelector("#inputCover").value,
      synopsis: document.querySelector("#inputSynopsis").value,
      publishDate: document.querySelector("#inputDate").value,
      publishDate: document.querySelector("#inputRating").value
    }).then(function(create) {
      if (create) {
        console.log(document.querySelector("#inputTitle").value)
      } else {
        console.log("Error: Failed to Add Book")
      }
    })
  } else {
    // books: 'title,author,numberOfPages,cover,synopsis,publishDate,rating'
    const newBook = db.books.put({
      title: event.title,
      author: event.author,
      numberOfPages: event.numberOfPages,
      cover: event.cover,
      synopsis: event.synopsis,
      publishDate: event.publishDate,
      rating: event.rating
    }).then(function(create) {
      if (create) {
        // populateTableUI(event.title);
        console.log(document.querySelector("#inputTitle").value)
      } else {
        console.log("Error: Failed to Add Book")
      }
    })
  }
  let form = document.querySelector("form")
  form.reset();

  //strip out table and rerender
  document.querySelector("tbody").innerHTML = "";
  populateTableUI();
  // Hint: Once you've added the book to your database, call populateTableUI with the added book's title
  // Che]ck out the Table.put() method and what it returns at: https://dexie.org/docs/Table/Table.put()
}


function editBook(event) {

    db.books.update(event.title, event)
      .then(function(updated) {
        if (updated) {
          console.log(`${event.title} updated`);
        } else {
          console.log("Error: failed to update");
        }
      })

}

// addBook({
//     title: "American Gods",
//     author: "Neil Gaiman",
//     numberOfPages: 300,
//     cover: null,
//     synopsis: "Blah",
//     publishDate: 1998,
//     rating: 5
//   })

// ************ 4. (BONUS) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************


async function populateTableUI() {
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];
  let allBooks = await db.books.where('title').aboveOrEqual(0).toArray()
  console.log(allBooks)

  for (let i = 0; i < allBooks.length; i++) {
    var tableRow = document.createElement('tr')

    for (let j = 0; j < columns.length; j++) {
      if (j == 1)  {
        let bookTitle = allBooks[i][columns[j]]
        var deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'delete book';
        deleteBtn.addEventListener("click", function(e) {
          deleteBook(bookTitle)
        })
      };

      let td = document.createElement('td')
      td.innerText = (allBooks[i][columns[j]] ? allBooks[i][columns[j]] : "")
      tableRow.append(td);
    }

    tableRow.append(deleteBtn)
    document.querySelector("tbody").append(tableRow)
  }

  document.querySelector("tbody").append(tableRow);
}

// Now that you’ve cloned your project lets start by testing our code. Let's start live
//server and open up our project in the browser. Open up your console and you should see
//some logs outputting book objects. These object are predefined in books.json and added to
//our database called library_database in indexedDB. We can also navigate to the
//application tab in the chrome console (storage in firefox) and take a look at the indexedDB
//storage We created this for you in indexedDB.js if you feel inclined to take a look.

// We've populated the table so the UI reflects what's currently in our local
// library_database in indexedDB.  We've logged the database above so you can see exactly
// what you're working with


// 1.) Now add functionality to remove a row  which will need remove the object from the books store in
//indexedDB database as well as the UI once the delete operation is complete. This will take some
//effort on the UI. Use the title as your UID (Unique identifier) which you can find in the application console
//in Chrome (storage in Firefox).

// 2.) From here we want to be able to add a book. Hook up the form below the table to add a
//book to the books store in indexedDB and auto-update the table without refreshing the page.
//Hint: This add operation is on the front page of DexieJS.  Both is and Table.put() can be
// used to add this book.

// 3.) Now make each table row editable and update the database when the edit is complete. This will
//take a lot of effort from the html to the js. Use the title as your UID (Unique identifier)
//which you can find in the application console

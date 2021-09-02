// toggle items

const toggle=(togglerName, displayStyle) => {
  document.getElementById(togglerName).style.display = displayStyle;
}


// search_function handle

    const searchBook = () => {
        const searchField = document.getElementById('search-field');

        //display spinner

        toggle('spinner','block');
        toggle('search-result','none');
        toggle('search-result-count','none');

        const searchText = searchField.value;
        searchField.value = '';

        //  load data

          const url = `https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
        
    }


// display search_result handle

    const displaySearchResult = books => {
        
        const resultFound=books.docs;

        //display number_of_search_result for 1 result

        if (resultFound.length === 1){
            const searchResultCount = document.getElementById('search-result-count');
            searchResultCount.innerHTML = `
            <div bg-danger>
            <span class="bg-primary text-light rounded px-5 py-2 fs-5">Only ${resultFound.length} result has found</span>
            </div>
            `;
        }

        //display number_of_search_result for more than 1 result

        else if (resultFound.length > 1){
          const searchResultCount = document.getElementById('search-result-count');
          searchResultCount.innerHTML = `
          <div bg-danger>
          <span class="bg-primary text-light rounded px-5 py-2 fs-5">About ${resultFound.length} results are showing</span>
          </div>
          `;
        }

        //display number_of_search_result for invalid input, blank input and no result 

        else {
          const searchResultCount = document.getElementById('search-result-count');
          searchResultCount.innerHTML = `
          <span class="bg-danger text-light rounded px-5 py-2 fs-5">No Result</span>
          `;
        }

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        resultFound.forEach(book => {

          // checking the availability of contents_of_ard

            let authorName = 'Not Available';
            let firstPublish = 'Not Available';
            let publisher = 'Not Available';

            if (book.hasOwnProperty('author_name')){
              authorName = book.author_name[0];
            }

            if (book.hasOwnProperty('first_publish_year')){
              firstPublish = book.first_publish_year;
            }

            if (book.hasOwnProperty('publisher')){
              publisher = book.publisher[0];
            }

        // insert contents to the card 

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
              <div class="col">
                <div class="card p-3">
                  <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h3 class="card-title mt-3 mb-4 fs-2 fw-bold">${book.title}</h3>
                    <p class="card-text  fs-5">
                    <span class="text-primary" >Author : </span> ${authorName} <br>
                    <span class="text-primary">Publisher : </span> ${publisher} <br>
                    <span class="text-primary">First Publish : </span> ${firstPublish}  
                    </p>
                  </div>
                </div>
              </div>
            `;
            searchResult.appendChild(div);
            })

          // clearing spinner and showing result

            toggle('spinner','none');
            toggle('search-result-count','block');
            toggle('search-result','flex');
        }




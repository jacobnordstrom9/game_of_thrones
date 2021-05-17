povCharacterContainer = document.getElementById("povCharacterResults");
povBookContainer = document.getElementById("bookResults");

// 1. Fetch all books
fetch("https://www.anapioficeandfire.com/api/books")
.then((response) => response.json())
.then((bookData) => {
    console.log("Book Data", bookData)
    bookData.forEach((bookName) => {
        if(bookName.name.length >0){
            // console.log("bookName.name", bookName.name)
            let bookDivElement = document.createElement("div")
            var bookContent = `
            <div class="book-title"> 
            ${bookName.name} - # of pages: ${bookName.numberOfPages}
            </div>
            `
            bookDivElement.innerHTML = bookContent
            povBookContainer.append(bookDivElement)
        }
    })

    // 2. For each book, check if the povCharacters array contains any urls
    bookData.forEach((character) => {
    if(character.povCharacters.length >0){

        // 3. For each item inside the povCharacters array, make new fetch request for
        // each specific character
        character.povCharacters.forEach((povCharacterApi) => {
            fetch(povCharacterApi)
            .then((response) => response.json())
            .then((povCharacterData) => {

                // 4. For each character, create a new div element with the className "card"
                let divElement = document.createElement("div")
                divElement.className = "card"

                // 5. Create the content to output inside each character card
                // Option A
                // var hasCulture = false
                // if (povCharacterData.culture.length > 0) {
                //     hasCulture = true
                // }
                // Option B
                var hasCulture = povCharacterData.culture.length > 0;
                var hasTitles = povCharacterData.titles.length > 1;
                var hasBorn = povCharacterData.born.length > 1;
                
                // If the character has titles, loop over the povCharacterData.titles array
                // and output a new <li> for each title
                // console.log('povCharacterData.titles: ', povCharacterData.titles);
                const titleOutput = `
                <div class="card-titles">
                    <p class="card-title-p">
                        <span class="card-title-span">Titles:</span>
                        ${povCharacterData.titles.map(title => ` ${title}`)}
                    </p>
                </div>
                `;
                
                // 6. Check if the returned character data's allegiances array
                // contains any data
                // if (povCharacterData.allegiances.length > 0){
                //     // If it does, 
                //     povCharacterData.allegiances.forEach((allegiancesAPI) => {
                //         fetch(allegiancesAPI)
                //         .then((response) => response.json())
                //         .then((allegianceData) => {
                //             // console.log("allegianceData", allegianceData)
                //             var characterAllegiances = document.getElementById("povCharacterResults")
                //             let li = document.createElement("li");
                //             li.innerText = `${allegianceData.name}`
                //             povCharacterContainer.append(li)
                //         })
                //     })
                // }
                var content = `
                    <h3 class="card-title"> ${povCharacterData.name} </h3>
                    ${hasCulture ? `<p class="card-overview"> Culture: ${povCharacterData.culture} </p>` : ""}
                    ${hasBorn ? `<p class="card-overview"> Born: ${povCharacterData.born} </p>` : ""}
                    ${hasTitles ? ` <p class="card-overview"> Titles: ${povCharacterData.titles} </p> `: ""} 

                `;

                // console.log('povCharacterData', povCharacterData);

                // LAST Append to the povCharacterContainer
                divElement.innerHTML = content
                povCharacterContainer.append(divElement)

            })
        })
    }
    })
    
})

const maxRecords = 151;
let limit = 10;
let offset = 0;

const appendHtml = (newHtml) => {
    document.getElementById("section").innerHTML += newHtml;
    offset += limit;
}

document.getElementById("loadMore").addEventListener("click", () => {
    const nextRecords = offset + limit;
    if(nextRecords >= maxRecords){
        limit = maxRecords - offset;
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    loadPokemons(offset, limit).then(appendHtml);
});

loadPokemons(offset, limit).then(appendHtml);
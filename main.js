const songs = document.getElementsByClassName("songs");
const table = document.getElementById("table-music");

async function recallArtists() {
  const url = "http://localhost/M6-Pt4/musicdb.php";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const artists = await response.json();

    return artists;
  } catch (error) {
    console.error(`Error al obtener los datos: ${error}`);
  }
}

async function recallAlbum(artist) {
  const url = `http://localhost/M6-Pt4/musicdb.php?artist=${artist}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const albums = await response.json();
    return albums;
  } catch (error) {
    console.error(`Error al obtener los albunes: ${error}`);
  }
}

function createRow(nomArtist, numCols) {
  let row = document.createElement("tr");
  let col = createCol(nomArtist);
  row.appendChild(col);
  return row;
}

function createCol(nomArtist) {
  let col = document.createElement("td");
  col.innerText = nomArtist;
  col.setAttribute("id", nomArtist);
  col.classList.add("cursor");
  eventCellNameArtist(col);
  return col;
}

function showNameArtists(data) {
  for (let i = 0; i < data.length; i++) {
    let row = createRow(data[i], i);
    table.appendChild(row);
  }
}

function showAlbumArtist(nameArtist, row) {
  recallAlbum(nameArtist).then((data) => {
    for (let i = 0; i < data.length; i++) {
      let album = data[i];
      let albumElement = document.createElement("div");
      albumElement.innerText = album;
      row.appendChild(albumElement);
    }
  });
}

function showMusicFromAlbum(album) {
  
}

function eventCellNameArtist(cells) {
  cells.addEventListener("click", (e) => {
    e.preventDefault();
    let artist = e.target.innerText;

    showAlbumArtist(artist, e.target.parentNode);
  });
}

recallArtists().then((data) => {
  showNameArtists(data);
});

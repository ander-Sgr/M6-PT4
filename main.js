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

async function recallSongFromAlbum(artist, nameAlbum) {
  const url = `http://localhost/M6-PT4/musicdb.php?artist=${artist}&album=${nameAlbum}`;
  try {

    const response = await fetch(url);


    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const songs = await response.json();

    return songs.song;
  } catch (error) {
    console.error(`Error al obtener los albunes: ${error}`);
  }
}

function createBoardDoom(data) {
  const numRows = data.length;

  for (let i = 0; i < numRows; i++) {
    let row = document.createElement('tr');

    // Crear y agregar la columna con el nombre del artista
    let artistCol = document.createElement('td');
    artistCol.innerText = data[i]; // Asignar el nombre del artista
    artistCol.classList.add('cursor');
    eventCellNameArtist(artistCol); // Agregar evento de clic para mostrar los álbumes
    row.appendChild(artistCol);

    // Crear la columna para los álbumes
    let albumCol = document.createElement('td');
    row.appendChild(albumCol);

    let songCol = document.createElement('td')
    row.appendChild(songCol)

    table.appendChild(row);
  }
}

function showNameArtist() {
  return new Promise((resolve, reject) => {
    recallArtists()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function showAlbumArtist(artist, albumCol, songCol, parent) {
  try {
    const albums = await recallAlbum(artist);
    for (let i = 0; i < albums.length; i++) {
      let albumElement = document.createElement('div');
      albumElement.innerText = albums[i];
      albumElement.setAttribute('id', albums[i]);


      albumElement.classList.add('cursor')
      albumCol.appendChild(albumElement);
      eventCellAlbumName(albumElement, songCol, artist, parent)
    }
  } catch (error) {
    console.error(error);
  }
}

async function showSongsFromAlumb(artist, album, songCol) {
  try {
    const songs = await recallSongFromAlbum(artist, album);
    for (let i = 0; i < songs.length; i++) {
      let songElement = document.createElement('div');
      songElement.innerHTML = `SongName: ${songs[i].songname} Duration: (${songs[i].duration})`;
      songElement.setAttribute('id', songs[i].songname);
      songCol.appendChild(songElement);
    }

  } catch (error) {
    console.error(error);
  }
}

function eventCellNameArtist(cell) {
  cell.addEventListener("click", (e) => {
    e.preventDefault();
    let artist = e.target.innerText;
    let row = e.target.parentNode
    let albumCol = row.querySelector('td:nth-child(2)');
    let songCol = row.querySelector('td:nth-child(3)');
    if (albumCol.innerHTML === '') {
      showAlbumArtist(artist, albumCol, songCol, row);
    } else {
      albumCol.innerHTML = '';
    }
  }); 
}

function eventCellAlbumName(cell, songCol, artistName, parent) {
  let currentAlbum = null; // Variable para almacenar el álbum actualmente mostrado

  cell.addEventListener("click", (e) => {
    e.preventDefault();
    let album = e.target.innerText;

    // Verificar si el álbum actual es diferente al álbum seleccionado
    if (currentAlbum !== album) {
      songCol.innerHTML = ''; // Limpiar la fila
      showSongsFromAlumb(artistName, album, songCol); // Mostrar las canciones del nuevo álbum
      currentAlbum = album; // Actualizar el álbum actual
    } else {
      songCol.innerHTML = ''; // Limpiar la fila
      currentAlbum = null; // Establecer el álbum actual a null
    }
  });
}




showNameArtist()
  .then((data) => {
    createBoardDoom(data);
  })
  .catch((error) => {
    console.error(error);
  })


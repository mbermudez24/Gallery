document.addEventListener("DOMContentLoaded", function () {
    const photoGallery = document.getElementById("photo-gallery");

    function loadPhotos(folderName) {
        const folderPath = `assets/img/${folderName}/`;
        console.log(folderPath);

        // Obtener las imágenes directamente, no es necesario usar fetch
        const numberOfImages = countImagesInFolder(folderName);
        const images = generateImagePaths(folderPath, numberOfImages);

        images.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add(folderName.toLowerCase());
            galleryItem.classList.add("photo");

            // Recuperar clases almacenadas en localStorage
            const storedClassesKey = `galleryClasses_${folderName}_${imgSrc}`;
            const storedClasses = localStorage.getItem(storedClassesKey);
            if (storedClasses) {
                const classesArray = JSON.parse(storedClasses);
                galleryItem.classList.add(...classesArray);
            }

            galleryItem.innerHTML = `
                <img src="${imgSrc}" alt="${`${galleryItem.classList} Photo `}">
                <div class="title">
                    <h3>${folderName}</h3>
                    <p>Lugar</p>
                </div>
            `;

            galleryItem.addEventListener('mouseover', function () {
                this.querySelector('img').style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
                this.querySelector('.title').style.opacity = '1';
            });

            galleryItem.addEventListener('mouseout', function () {
                this.querySelector('img').style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                this.querySelector('.title').style.opacity = '0';
            });

            galleryItem.querySelector('img').addEventListener('click', function () {
                modification(galleryItem, folderName, imgSrc);
            });

            photoGallery.appendChild(galleryItem);
        });


    }

    function countImagesInFolder(FolderName) {
        if (FolderName === 'assets/img/Argentina/') {
            return 7;
        }
        else if (FolderName === 'Colombia') {
            console.log('entró')
            return 12;
        }
        else if (FolderName === 'France') {
            return 6;
        } else if (FolderName === 'Italy') {
            return 20;
        }
        else if (FolderName === 'Spain') {
            return 3;
        } else if (FolderName === 'Switzerland') {
            return 9;
        }
        else if (FolderName === 'USA') {
            return 19;
        }

    }

    function generateImagePaths(folderPath, numberOfImages) {
        const images = [];
        for (let i = 1; i <= numberOfImages; i++) {
            images.push(`${folderPath}image${i}.jpg`);
        }
        return images;
    }


    // Cargar fotos de cada carpeta
    loadPhotos("Colombia");
    loadPhotos("Argentina");
    loadPhotos("Spain");
    loadPhotos("USA");
    loadPhotos("Switzerland");
    loadPhotos("Italy");
    loadPhotos("France");

    // Función que se llama al hacer clic en el botón y pide una contraseña
    function modification(element, folderName, imageSrc) {
        const password = prompt("Enter the password:");
        if (password === "manuel") {
            const action = prompt("What do you want to do? (Type 'add' to add a class, 'delete' to remove a class)");

            if (action === "add") {
                const className = prompt("Enter the name of the class to add:");

                // Agregar clase al elemento
                element.classList.add(className);

                // Obtener y actualizar clases almacenadas en localStorage
                const currentClasses = element.classList;
                const classesArray = Array.from(currentClasses);
                const storedClassesKey = `galleryClasses_${folderName}_${imageSrc}`;
                localStorage.setItem(storedClassesKey, JSON.stringify(classesArray));
            } else if (action === "delete") {
                const classNameToDelete = prompt("Enter the name of the class to delete:");

                // Eliminar clase del elemento
                element.classList.remove(classNameToDelete);

                // Obtener y actualizar clases almacenadas en localStorage
                const currentClasses = element.classList;
                const classesArray = Array.from(currentClasses);
                const storedClassesKey = `galleryClasses_${folderName}_${imageSrc}`;
                localStorage.setItem(storedClassesKey, JSON.stringify(classesArray));
            } else {
                alert("Unrecognized action.");
            }
        } else if (password === "") {
            return;
        } else {
            alert("Incorrect password. Access denied.");
        }
    }

});

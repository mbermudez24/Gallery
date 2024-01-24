document.addEventListener("DOMContentLoaded", function () {
    const photoGallery = document.getElementById("photo-gallery");

    // Función para cargar fotos de una carpeta
    function loadPhotos(folderName) {
        const folderPath = `assets/img/${folderName}/`;
        console.log(folderPath);

        fetch(folderPath)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
                const images = doc.body.querySelectorAll('a[href$=".jpg"]');
                console.log(images)

                images.forEach(aTag => {
                    const galleryItem = document.createElement('div');
                    galleryItem.classList.add(folderName.toLowerCase());
                    galleryItem.classList.add("photo");

                    // Recuperar clases almacenadas en localStorage
                    const storedClassesKey = `galleryClasses_${folderName}_${aTag.getAttribute("href")}`;
                    const storedClasses = localStorage.getItem(storedClassesKey);
                    if (storedClasses) {
                        const classesArray = JSON.parse(storedClasses);
                        galleryItem.classList.add(...classesArray);
                    }

                    galleryItem.innerHTML = `
           
                            <img src="${aTag.getAttribute("href")}" alt="${`${galleryItem.classList} Photo `}">
                            <div class="title">
                                <h3>Titulo</h3>
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
                        modification(galleryItem, folderName, aTag.getAttribute("href"));
                    });
                    console.log(galleryItem)

                    photoGallery.appendChild(galleryItem);
                });
            })
            .catch(error => console.error(error));
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
        const password = prompt("Ingrese la contraseña:");
        if (password === "manuel") {
            const action = prompt("¿Qué desea hacer? (Escriba 'clase' para agregar una clase)");

            if (action === "clase") {
                const className = prompt("Ingrese el nombre de la clase:");

                // Agregar clase al elemento
                element.classList.add(className);

                // Obtener y actualizar clases almacenadas en localStorage
                const currentClasses = element.classList;
                const classesArray = Array.from(currentClasses);
                const storedClassesKey = `galleryClasses_${folderName}_${imageSrc}`;
                localStorage.setItem(storedClassesKey, JSON.stringify(classesArray));
            } else {
                alert("Acción no reconocida.");
            }
        } else {
            alert("Contraseña incorrecta. Acceso denegado.");
        }
    }
});

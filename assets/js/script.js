document.addEventListener("DOMContentLoaded", function () {
    const photoGallery = document.getElementById("photo-gallery");

    function loadPhotos(folderName) {
        const folderPath = `assets/img/${folderName}/`;
        const numberOfImages = countImagesInFolder(folderName);
        const images = generateImagePaths(folderPath, numberOfImages);

        images.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add(folderName.toLowerCase(), "photo");

            const storedClassesKey = `galleryClasses_${folderName}_${imgSrc}`;
            const storedClasses = localStorage.getItem(storedClassesKey);

            if (storedClasses) {
                const classesArray = JSON.parse(storedClasses);
                galleryItem.classList.add(...classesArray);
            }

            const storedContentKey = `galleryContent_${folderName}_${imgSrc}`;
            const storedContent = localStorage.getItem(storedContentKey);
            const defaultContent = "Lugar";

            galleryItem.innerHTML = `
                <img src="${imgSrc}" alt="${galleryItem.classList} Photo ">
                <div class="title">
                    <h3>${folderName}</h3>
                    <p>${storedContent || defaultContent}</p>
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

    function countImagesInFolder(folderName) {
        const imageCounts = {
            'Argentina': 7,
            'Colombia': 12,
            'France': 6,
            'Italy': 19,
            'Spain': 3,
            'Switzerland': 9,
            'USA': 19,
        };
        return imageCounts[folderName] || 0;
    }

    function generateImagePaths(folderPath, numberOfImages) {
        return Array.from({ length: numberOfImages }, (_, i) => `${folderPath}image${i + 1}.jpg`);
    }

    function modification(element, folderName, imageSrc) {
        const password = prompt("Enter the password:");
        if (password === "manuel") {
            const action = prompt("What do you want to do? (Type 'add' to add a class, 'delete' to remove a class, 'modify' to modify <p>)");

            if (action === "add" || action === "delete" || action === "modify") {
                const titleParagraph = element.querySelector('.title p');

                if (action === "add") {
                    const className = prompt("Enter the name of the class to add:");
                    element.classList.add(className);
                } else if (action === "delete") {
                    const classNameToDelete = prompt("Enter the name of the class to delete:");
                    element.classList.remove(classNameToDelete);
                } else if (action === "modify") {
                    const newContent = prompt("Enter the new content for the <p>:");
                    titleParagraph.textContent = newContent;
                }

                const currentClasses = element.classList;
                const classesArray = Array.from(currentClasses);
                const storedClassesKey = `galleryClasses_${folderName}_${imageSrc}`;
                localStorage.setItem(storedClassesKey, JSON.stringify(classesArray));

                const storedContentKey = `galleryContent_${folderName}_${imageSrc}`;
                localStorage.setItem(storedContentKey, titleParagraph.textContent);
            } else {
                alert("Unrecognized action.");
            }
        } else if (password !== "") {
            alert("Incorrect password. Access denied.");
        }
    }

    window.display = function (folderName) {
        const galleryItems = document.querySelectorAll('.photo');

        if (galleryItems.length > 0) {
            galleryItems.forEach(item => {
                if (folderName.toLowerCase() === 'all' || item.classList.contains(folderName.toLowerCase())) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        } else {
            console.error(`No items found for folder: ${folderName}`);
        }
    };

    // Load photos for each folder
    loadPhotos("Colombia");
    loadPhotos("Argentina");
    loadPhotos("Spain");
    loadPhotos("USA");
    loadPhotos("Switzerland");
    loadPhotos("Italy");
    loadPhotos("France");
});

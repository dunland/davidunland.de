var visibleCategories = [];

document.addEventListener("DOMContentLoaded", function () {

    window.onscroll = function () { myFunction() };

    var header = document.getElementById("websiteHeader");
    var sticky = header.offsetTop;

    function myFunction() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    const categoryButtons = document.querySelectorAll("#category-buttons button");

    // initially fill categories array:
    categoryButtons.forEach((el) => {
        const category = el.getAttribute("data-category");
        visibleCategories.push(category);
    })

    // onclick callback:
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            this.classList.toggle("active");
            toggleTileVisibility(category);
            updateArray(category);
            updateURL();
        });
    });

    function toggleTileVisibility(category) {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile => {
            if (tile.classList.contains(category)) {
                if (visibleCategories.contains(category)){
                    tile.classList.toggle("hidden");

                }
            }
        });
    }

    function updateArray(category){
        const index = visibleCategories.indexOf(category);
        if (index > -1) {
            visibleCategories.splice(index, 1);
        }
        else if (!visibleCategories.includes(category)) {
            visibleCategories.push(category);
        }
        console.log(visibleCategories);

    }

    function updateURL() {
        const url = new URL(window.location.href);
        url.searchParams.set("categories", visibleCategories.join(","));
        window.history.pushState({}, '', url);
    }

    // Initial URL state
    const urlParams = new URLSearchParams(window.location.search);
    const categoriesParam = urlParams.get("categories");
    if (categoriesParam) {
        categoryButtons.forEach(button => {
            button.classList.remove("active")
        });

        const categories = categoriesParam.split(",");
        visibleCategories = categories;
        visibleCategories.forEach(category => {
            categoryButtons.forEach(button => {
                if (button.getAttribute("data-category") == category) {
                    button.classList.add("active");
                    toggleTileVisibility(category);
                    console.log(category);
                }
            })
        }
        );
    }
});

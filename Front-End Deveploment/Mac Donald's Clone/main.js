// This JavaScript code will handle the animations that will occur on the website

// Selects the main image
const image = document.querySelector('#ImagemPrincipal');

// Image paths for switching
const firstImageSrc = "Imagens/Imagem1.png";
const secondImageSrc = "Imagens/Imagem18.png";

// Variable to track the current image state
let isShowingFirstImage = true;

// Adds the event to switch images when dragging
image.addEventListener("mousedown", () => {
    const onMouseMove = () => {
        // Switches between the images
        image.src = isShowingFirstImage ? secondImageSrc : firstImageSrc;
        isShowingFirstImage = !isShowingFirstImage; // Updates the state

        // Removes the move listener after switching
        document.removeEventListener("mousemove", onMouseMove);
    };

    // Detects mouse movement
    document.addEventListener("mousemove", onMouseMove);

    // Removes listeners after the mouse is released
    document.addEventListener(
        "mouseup",
        () => {
            document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
    );
});

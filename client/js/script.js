document.addEventListener("DOMContentLoaded", () => {
    const vrSection = document.getElementById("vr-section");
    if (vrSection) {
        vrSection.addEventListener("click", () => {
            const vrModal = new bootstrap.Modal(document.getElementById('vrModal'));
            vrModal.show();
        });
    }
});

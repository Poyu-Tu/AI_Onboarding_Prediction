// 彈出式視窗
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: formData
    });

    const result = await response.json();

    if (response.ok) {
        const modelSelection = form.querySelector('select[name="model_selection"]');
        const selectedOptionText = modelSelection.options[modelSelection.selectedIndex].text;
        showModal(`✨${selectedOptionText}✨: ${result[formData.get('model_selection')]}`);
    } else {
        showModal(`ERROR❗: ${result.error}`);
    }
}

function showModal(message) {
    const modal = document.getElementById("resultModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("resultModal");
    modal.style.display = "none";
}

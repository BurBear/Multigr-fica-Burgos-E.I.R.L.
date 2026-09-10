document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCotizacion");
  if (!form) return;

  const fields = {
    nombre: document.getElementById("nombre"),
    celular: document.getElementById("celular"),
    correo: document.getElementById("correo"),
    ruc: document.getElementById("ruc"),
    servicio: document.getElementById("servicio"),
    mensaje: document.getElementById("mensaje")
  };

  const clearErrors = () => {
    form.querySelectorAll(".error-text").forEach(error => error.remove());
    form.querySelectorAll(".error").forEach(field => {
      field.classList.remove("error");
      field.removeAttribute("aria-invalid");
    });
  };

  const showError = (field, message) => {
    if (!field) return;
    field.classList.add("error");
    field.setAttribute("aria-invalid", "true");

    const small = document.createElement("small");
    small.className = "error-text";
    small.textContent = message;
    field.parentElement.appendChild(small);
  };

  form.addEventListener("submit", event => {
    clearErrors();

    const nombre = fields.nombre?.value.trim() || "";
    const celular = fields.celular?.value.trim() || "";
    const correo = fields.correo?.value.trim() || "";
    const ruc = fields.ruc?.value.trim() || "";
    const servicio = fields.servicio?.value || "";

    const errors = [];

    if (nombre.length < 3) {
      errors.push([fields.nombre, "Debe tener al menos 3 caracteres."]);
    }

    if (!/^[0-9]{9}$/.test(celular)) {
      errors.push([fields.celular, "Debe contener 9 dígitos numéricos."]);
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
      errors.push([fields.correo, "Correo electrónico no válido."]);
    }

    if (ruc && !/^[0-9]{11}$/.test(ruc)) {
      errors.push([fields.ruc, "El RUC debe tener 11 números."]);
    }

    if (!servicio) {
      errors.push([fields.servicio, "Selecciona un servicio."]);
    }

    if (errors.length) {
      event.preventDefault();
      errors.forEach(([field, message]) => showError(field, message));
      form.querySelector(".error")?.focus();
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando solicitud...";
    }
  });
});

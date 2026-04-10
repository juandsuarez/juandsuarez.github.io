document.addEventListener("DOMContentLoaded", () => {
  emailjs.init({
    publicKey: "vv4APhP-sYJmlHx6B"
  });

  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");
  const submitBtn = document.getElementById("formSubmitBtn");

  if (!form) return;

  const requiredFields = ["nombre", "telefono", "correo", "servicio", "mensaje"];

  function setFieldError(id, message) {
    const field = document.getElementById(id);
    const group = field.closest(".form-group");
    const error = group.querySelector(".field-error");

    group.classList.add("has-error");
    error.textContent = message;
  }

  function clearFieldError(id) {
    const field = document.getElementById(id);
    const group = field.closest(".form-group");
    const error = group.querySelector(".field-error");

    group.classList.remove("has-error");
    error.textContent = "";
  }

  function clearAllErrors() {
    requiredFields.forEach(clearFieldError);
    clearFieldError("empresa");
    alertBox.className = "form-alert";
    alertBox.innerHTML = "";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let valid = true;
    clearAllErrors();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre) {
      setFieldError("nombre", "Por favor ingresa tu nombre.");
      valid = false;
    }

    if (!telefono) {
      setFieldError("telefono", "Por favor ingresa tu teléfono.");
      valid = false;
    }

    if (!correo) {
      setFieldError("correo", "Por favor ingresa tu correo.");
      valid = false;
    } else if (!isValidEmail(correo)) {
      setFieldError("correo", "Ingresa un correo válido.");
      valid = false;
    }

    if (!servicio) {
      setFieldError("servicio", "Selecciona un servicio.");
      valid = false;
    }

    if (!mensaje) {
      setFieldError("mensaje", "Cuéntanos qué necesitas.");
      valid = false;
    }

    if (!valid) {
      alertBox.className = "form-alert show error";
      alertBox.textContent = "Por favor completa los campos obligatorios.";
    }

    return valid;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // TOMAR LOS VALORES ANTES DE ENVIAR Y ANTES DE RESET
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    submitBtn.classList.add("is-loading");
    submitBtn.textContent = "Enviando...";
    alertBox.className = "form-alert show";
    alertBox.textContent = "Enviando solicitud...";

    try {
      await emailjs.sendForm(
        "service_vozxjlk",
        "template_r3dltmq",
        form
      );

      // PRIMERO mostrar mensaje con variables
      alertBox.className = "form-alert show success";
      alertBox.innerHTML = `
        <strong>Solicitud enviada correctamente</strong><br><br>
        Hola ${nombre}, ya recibimos tu solicitud.<br>
        Muy pronto te contactaremos al correo <strong>${correo}</strong>
        o al número <strong>${telefono}</strong><br><br>
        Gracias por confiar en RW Producciones.
      `;

      // DESPUÉS limpiar formulario
      form.reset();
      requiredFields.forEach(clearFieldError);
      clearFieldError("empresa");

    } catch (error) {
      console.error(error);
      alertBox.className = "form-alert show error";
      alertBox.textContent = "No se pudo enviar el mensaje. Revisa la configuración de EmailJS.";
    } finally {
      submitBtn.classList.remove("is-loading");
      submitBtn.textContent = "Enviar solicitud";
    }
  });
});
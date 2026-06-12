// ======================
// Smooth Scroll
// ======================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ======================
// Active Navbar Link
// ======================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }

    });

});

// ======================
// Doctor Know More Buttons
// ======================

const doctorButtons = document.querySelectorAll(".doctor-card button");

doctorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const doctorName =
            button.parentElement.querySelector("h3").textContent;

        alert(
            `${doctorName}

Available:
Monday - Saturday

Consultation Hours:
10:00 AM - 6:00 PM

Book an appointment for detailed consultation.`
        );

    });

});

// ======================
// Appointment Form
// ======================

const appointmentForm =
document.getElementById("appointment-form");

if(appointmentForm){

    appointmentForm.addEventListener("submit", function(e){

        e.preventDefault();

        const patientName =
        document.getElementById("patient-name").value;

        const phone =
        document.getElementById("phone").value;

        if(patientName.trim() === ""){

            alert("Please enter patient name.");
            return;
        }

        if(phone.length < 10){

            alert("Enter valid phone number.");
            return;
        }

        alert(
            "Appointment Booked Successfully ✅"
        );

        appointmentForm.reset();

    });

}

// ======================
// Contact Form
// ======================

const contactForm =
document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const message =
        document.getElementById("message").value;

        if(
            name.trim() === "" ||
            email.trim() === "" ||
            message.trim() === ""
        ){

            alert("Please fill all fields.");
            return;
        }

        alert(
            "Message Sent Successfully 📩"
        );

        contactForm.reset();

    });

}

// ======================
// Footer Year Auto Update
// ======================

const yearElement =
document.getElementById("year");

if(yearElement){
    yearElement.textContent =
    new Date().getFullYear();
}
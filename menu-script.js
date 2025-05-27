import React, { useState, useEffect } from "react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formState.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Correo inválido";
    }
    if (!formState.message.trim())
      newErrors.message = "El mensaje no puede estar vacío";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert("¡Mensaje enviado con éxito!");
        setFormState({ name: "", email: "", message: "" });
        setErrors({});
      }, 1500);
    }
  };

  // Close menu on scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 header bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-[#E0FD2C]">MiEmpresa</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="nav-link text-white hover:text-[#E0FD2C] transition-colors">Servicios</a>
            <a href="#about" className="nav-link text-white hover:text-[#E0FD2C] transition-colors">Nosotros</a>
            <a href="#contact" className="nav-link text-white hover:text-[#E0FD2C] transition-colors">Contacto</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden nav-toggle p-2 rounded-lg border ${
              isMenuOpen ? "border-[#E0FD2C]" : "border-gray-600"
            } transition-all duration-300`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav
          className={`md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 transform transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col py-4 space-y-3 px-4">
            <li>
              <a
                href="#services"
                className="block py-2 px-4 rounded-lg hover:bg-gray-900 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 px-4 rounded-lg hover:bg-gray-900 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-4 rounded-lg hover:bg-gray-900 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero pt-24 pb-16 min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#E0FD2C] hero-title">
              Soluciones tecnológicas innovadoras para tu negocio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 hero-description">
              Ofrecemos servicios integrales en desarrollo de software, inteligencia artificial y soluciones IoT que impulsan el crecimiento de tu empresa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="bg-[#E0FD2C] text-black px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-colors cta-button"
              >
                Contáctanos
              </a>
              <a
                href="#services"
                className="border border-[#E0FD2C] text-[#E0FD2C] px-8 py-3 rounded-lg font-semibold hover:bg-[#E0FD2C]/10 transition-colors"
              >
                Nuestros Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="main-services py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#E0FD2C]">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Desarrollo Web",
                description:
                  "Creamos sitios web modernos, responsivos y optimizados para brindar la mejor experiencia de usuario y posicionamiento SEO.",
              },
              {
                title: "Aplicaciones Móviles",
                description:
                  "Diseñamos aplicaciones móviles intuitivas y escalables para Android e iOS que se adaptan a las necesidades de tu negocio.",
              },
              {
                title: "Inteligencia Artificial",
                description:
                  "Implementamos soluciones avanzadas de IA para análisis de datos, automatización y toma de decisiones inteligentes.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#E0FD2C] transition-all duration-300 service-card"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#E0FD2C]">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="iot-section py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#E0FD2C]">Sobre Nosotros</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 iot-image">
              <img src="https://picsum.photos/800/450 " alt="IoT Solutions" className="w-full h-full object-cover" />
            </div>
            <div className="iot-content">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Somos una empresa dedicada al desarrollo de soluciones tecnológicas personalizadas, enfocándonos en ofrecer resultados eficientes y sostenibles para nuestros clientes.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Con más de 10 años de experiencia en el sector, hemos trabajado con empresas de diversos sectores, ayudándolas a mejorar su productividad, reducir costos operativos y alcanzar sus metas estratégicas mediante el uso de tecnología de vanguardia.
              </p>
              <ul className="space-y-3 mt-6">
                {[
                  "Equipo multidisciplinario de expertos",
                  "Enfoque centrado en el cliente",
                  "Soluciones personalizadas y escalables",
                  "Soporte técnico post-implementación",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300 iot-details">
                    <span className="text-[#E0FD2C] mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#E0FD2C]">Contáctanos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 contact-content-wrapper">
            {/* Contact Info Card */}
            <div className="contact-info-wrapper bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-[#E0FD2C] transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-[#E0FD2C]">Información de Contacto</h3>
              <div className="space-y-4 contact-info-items">
                <div className="contact-item flex items-center">
                  <i className="mr-3 text-[#E0FD2C]">📞</i>
                  <span>+1 234 567 890</span>
                </div>
                <div className="contact-item flex items-center">
                  <i className="mr-3 text-[#E0FD2C]">✉️</i>
                  <span>contacto@miempresa.com</span>
                </div>
                <div className="contact-item flex items-start">
                  <i className="mr-3 text-[#E0FD2C] mt-1">📍</i>
                  <span>Calle Principal #123, Ciudad Tecnológica, País</span>
                </div>
                <div className="contact-item flex items-center">
                  <i className="mr-3 text-[#E0FD2C]">🕒</i>
                  <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className="mt-8 social-links flex justify-center space-x-4">
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-[#E0FD2C] transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-[#E0FD2C]">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="newsletter-form space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FD2C]/50`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FD2C]/50`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Escríbenos tu consulta..."
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FD2C]/50 resize-y`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E0FD2C] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors cta-button"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="footer-section newsletter-section">
              <h4 className="text-xl font-semibold mb-4 text-[#E0FD2C]">Suscríbete a nuestro boletín</h4>
              <p className="text-gray-400 mb-4">
                Recibe actualizaciones sobre nuestras últimas soluciones tecnológicas y ofertas especiales.
              </p>
              <form className="newsletter-form space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FD2C]/50"
                />
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FD2C]/50"
                />
                <button
                  type="submit"
                  className="bg-[#E0FD2C] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>

            <div className="footer-section">
              <h4 className="text-xl font-semibold mb-4 text-[#E0FD2C]">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#E0FD2C] transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-[#E0FD2C] transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-[#E0FD2C] transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E0FD2C] transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E0FD2C] transition-colors">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="text-xl font-semibold mb-4 text-[#E0FD2C]">Información de Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#E0FD2C] mr-2">📞</span>
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E0FD2C] mr-2">✉️</span>
                  <span>contacto@miempresa.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E0FD2C] mr-2">📍</span>
                  <span>Calle Principal #123, Ciudad Tecnológica, País</span>
                </li>
              </ul>
              <div className="mt-6 social-links flex space-x-4">
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-[#E0FD2C] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} MiEmpresa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-[#E0FD2C] text-black shadow-lg hover:bg-yellow-400 transition-all duration-300 scroll-to-top hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>

      <style jsx>{`
        /* Custom styles for animations and overrides */
        @keyframes goldShine {
          0% {
            background-position: 0% 50%;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6);
          }
          50% {
            background-position: 100% 50%;
            text-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8);
          }
          100% {
            background-position: 0% 50%;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6);
          }
        }

        .hero {
          background: linear-gradient(rgba(26, 26, 26, 0.7), rgba(42, 42, 42, 0.7)),
            url('https://picsum.photos/1920/1080 ');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .cta-button {
          animation: goldShine 3s ease infinite;
          background: linear-gradient(90deg, #E0FD2C, #d7ef30);
          background-size: 400% 100%;
        }

        .scroll-to-top.show {
          display: flex !important;
          animation: fadeInUp 0.3s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding-top: 120px !important;
          }

          .scroll-to-top {
            display: flex !important;
          }

          .contact-form-wrapper,
          .contact-info-wrapper {
            min-height: auto !important;
            height: auto !important;
          }

          .contact-form input,
          .contact-form textarea {
            position: relative !important;
            z-index: 1001 !important;
          }

          body.form-focused .header {
            transform: translateY(-100%) !important;
          }
        }

        @media (min-width: 769px) {
          .scroll-to-top {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;

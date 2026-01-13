import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Cloud,
  BarChart3,
  Lock,
  Users,
  Briefcase,
  FileText,
  Download,
  Menu,
  X,
  Globe,
  ChevronDown
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import i18n from './i18n/i18n'

// Language Switcher Component
function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English', flag: 'us' },
    { code: 'de', label: 'Deutsch', flag: 'de' },
    { code: 'fr', label: 'Français', flag: 'fr' },
    { code: 'es', label: 'Español', flag: 'es' },
    { code: 'it', label: 'Italiano', flag: 'it' },
    { code: 'ru', label: 'Русский', flag: 'ru' },
    { code: 'zh', label: '中文', flag: 'cn' },
    { code: 'ja', label: '日本語', flag: 'jp' },
    { code: 'ko', label: '한국어', flag: 'kr' },
    { code: 'ar', label: 'العربية', flag: 'sa' },
  ]

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
      >
        <img
          src={`https://flagcdn.com/w40/${currentLang.flag}.png`}
          alt=""
          className="w-5 h-auto rounded-sm border border-gray-100"
        />
        <span className="hidden sm:inline">{currentLang.label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60] max-h-[400px] overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${i18n.language === lang.code ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700'
                }`}
            >
              <img
                src={`https://flagcdn.com/w40/${lang.flag}.png`}
                alt=""
                className="w-5 h-auto rounded-sm border border-gray-100"
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Header Component
function Header() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'documents', label: t('nav.documents') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map(link => document.getElementById(link.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navLinks[index].id)
          }
        }
      })
    }

    // Initialize dir on load
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [i18n.language])

  return (
    <motion.header
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-full transition-shadow duration-300 w-[calc(100%-2rem)] max-w-max flex items-center gap-4 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-lg'
        : 'bg-white/80 backdrop-blur-sm shadow-md'
        }`}
    >
      <nav className="flex items-center gap-4 md:gap-8">
        <a href="#home" className="text-xl font-bold text-blue-600">
          MODERNBIZ
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${activeSection === link.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg p-4 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === link.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}

// Hero Section
function Hero() {
  const { t } = useTranslation()
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('hero.title')}{' '}
              <span className="text-blue-600">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition-colors"
            >
              {t('hero.cta')}
            </motion.a>
          </motion.div>

          {/* Right Side - Abstract Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <svg viewBox="0 0 500 500" className="w-full h-auto">
              {/* Background circles */}
              <circle cx="250" cy="250" r="200" fill="#EFF6FF" />
              <circle cx="250" cy="250" r="150" fill="#DBEAFE" />

              {/* Geometric shapes */}
              <motion.rect
                x="180" y="150" width="100" height="100" rx="20"
                fill="#2563EB"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.rect
                x="220" y="200" width="80" height="80" rx="16"
                fill="#3B82F6"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="320" cy="180" r="40"
                fill="#60A5FA"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="180" cy="300" r="30"
                fill="#93C5FD"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Accent elements */}
              <rect x="300" y="280" width="60" height="60" rx="12" fill="#2563EB" opacity="0.8" />
              <rect x="340" y="320" width="40" height="40" rx="8" fill="#3B82F6" opacity="0.6" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function Services() {
  const { t } = useTranslation()
  const services = [
    {
      icon: Briefcase,
      title: t('services.items.consulting.title'),
      description: t('services.items.consulting.description')
    },
    {
      icon: Cloud,
      title: t('services.items.cloud.title'),
      description: t('services.items.cloud.description')
    },
    {
      icon: BarChart3,
      title: t('services.items.analytics.title'),
      description: t('services.items.analytics.description')
    },
    {
      icon: Lock,
      title: t('services.items.cyber.title'),
      description: t('services.items.cyber.description')
    },
    {
      icon: Shield,
      title: t('services.items.protection.title'),
      description: t('services.items.protection.description')
    },
    {
      icon: Users,
      title: t('services.items.cooperation.title'),
      description: t('services.items.cooperation.description')
    },
  ]

  return (
    <section id="services" className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Documents Section
function Documents() {
  const { t } = useTranslation()
  const documents = [
    { name: t('documents.items.overview'), size: '2.4 MB' },
    { name: t('documents.items.catalog'), size: '1.8 MB' },
    { name: t('documents.items.case_studies'), size: '5.2 MB' },
    { name: t('documents.items.tech_specs'), size: '3.1 MB' },
  ]

  return (
    <section id="documents" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('documents.title')}</h2>
          <p className="text-gray-600">{t('documents.subtitle')}</p>
        </motion.div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.size}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('documents.download')}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Text */}
            <div className="bg-blue-600 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider">{t('about.title')}</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-4">
                {t('about.p1')}
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                {t('about.p2')}
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Modern office space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function Contact() {
  const { t } = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert(t('contact.success'))
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder={t('contact.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder={t('contact.emailPlaceholder')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
              placeholder={t('contact.messagePlaceholder')}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            {t('contact.submit')}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="py-8 px-4 bg-gray-900 text-center">
      <p className="text-gray-400">
        {t('footer.copy')}
      </p>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Documents />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

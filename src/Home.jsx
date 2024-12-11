import React, {useState, useEffect, useRef} from 'react';
import { ShoppingCart, Star, Phone, Mail, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import './index.css'


const holidayProducts = [
    { id: 1, name: 'Premium Artificial Christmas Tree', price: 299.99, description: '7.5ft Pre-lit Fir', image: 'https://picsum.photos/seed/christmas-tree/400/400' },
    { id: 2, name: 'LED Light Bundle', price: 89.99, description: 'Professional Grade Outdoor Lights', image: 'https://picsum.photos/seed/christmas-lights/400/400' },
    { id: 3, name: 'Deluxe Ornament Collection', price: 149.99, description: '50pc Mixed Ornaments', image: 'https://picsum.photos/seed/christmas-ornaments/400/400' },
    { id: 4, name: 'Festive Wreath', price: 59.99, description: '24-inch Decorated Holiday Wreath', image: 'https://picsum.photos/seed/wreath/400/400' },
    { id: 5, name: 'Holiday Garland', price: 79.99, description: '9ft Pre-lit Decorated Garland', image: 'https://picsum.photos/seed/garland/400/400' },
    { id: 6, name: 'Christmas Tree Skirt', price: 39.99, description: '48-inch Quilted Tree Skirt', image: 'https://picsum.photos/seed/tree-skirt/400/400' },
    { id: 7, name: 'Holiday Stocking Set', price: 49.99, description: '4-Pack Classic Christmas Stockings', image: 'https://picsum.photos/seed/stockings/400/400' },
    { id: 8, name: 'Outdoor Inflatable Santa', price: 129.99, description: '6ft Lighted Inflatable Santa Claus', image: 'https://picsum.photos/seed/santa/400/400' },
    { id: 9, name: 'Holiday Table Runner', price: 24.99, description: 'Embroidered Christmas Table Runner', image: 'https://picsum.photos/seed/table-runner/400/400' },
];



const testimonialsData = [
    { id: 1, text: "They transformed our home into a winter wonderland! Highly recommend their service.", author: "Sarah M." },
    { id: 2, text: "Professional setup and stunning decorations. Will use again next year!", author: "James R." },
    { id: 3, text: "The team was punctual and the results exceeded our expectations.", author: "Linda K." },
];

const Home = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([])
    let startIndex = useRef(0);
    const elementRef = useRef(null);
    const [productsIsVisible, setProductsIsVisible] = useState(false);
    useEffect(() => {
        // Initialize AOS
        if (typeof window !== 'undefined') {

            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
        const handleScroll = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.left >= 0
                    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
                    setProductsIsVisible(!productsIsVisible);
                }
                window.addEventListener('scroll', handleScroll);
                handleScroll();

                return () => window.removeEventListener('scroll', handleScroll);
            }
        }
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    function setRotatedProducts(startIndex, count) {
        // Check if holidayProducts is valid
        if (!holidayProducts || holidayProducts.length === 0) {
            console.error("No products available!");
            return;
        }

        const products = [];
        for (let i = 0; i < count; i++) {
            const safeIndex = (startIndex + i) % holidayProducts.length; // Wrap index
            products.push(holidayProducts[safeIndex]);
        }
        setCurrentProducts(products);
    }

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };
    useEffect(() => {
        setRotatedProducts(startIndex.current, 3);
        let interval = setInterval(() => {
            setRotatedProducts(startIndex.current, 3);
            startIndex.current += 3;
        },7000);
        return () => clearInterval(interval);

    }, [holidayProducts]);
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-red-700 text-white p-4 fixed w-full z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold" data-aos="fade-right">Festive Decor Pro</h1>
                    <div className="flex items-center gap-6" data-aos="fade-left">
                        <a href="#services" className="hover:text-red-200">Services</a>
                        <a href="#products" className="hover:text-red-200">Products</a>
                        <a href="#contact" className="hover:text-red-200">Contact</a>
                        <div className="relative">
                            <ShoppingCart className="cursor-pointer" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-[url('https://images.squarespace-cdn.com/content/v1/62ef9f333b26b24f053c9aa0/d5f9e2e3-b777-4417-800d-0c6be4d55c75/Top+5+Interior+Designer-Approved+Christmas+Decoration+Ideas+For+Your+Charlotte+Home')] bg-cover bg-center h-screen">
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center text-center pt-16">
                    <div className="text-white max-w-3xl p-8">
                        <h1 className="text-5xl font-bold mb-4" data-aos="fade-down">Transform Your Home for the Holidays</h1>
                        <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="200">Professional Christmas decoration services and premium products</p>
                        <button
                            className="bg-red-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-800 transition"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section id="services" className="py-16 max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-xl font-bold mb-4">Tree Setup & Decoration</h3>
                        <p>Professional installation and decoration of your Christmas tree, including lights and ornaments.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-xl font-bold mb-4">Exterior Lighting</h3>
                        <p>Custom outdoor lighting design and installation for your home's exterior and landscape.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-xl font-bold mb-4">Interior Decoration</h3>
                        <p>Complete indoor holiday decoration services, from garlands to window displays.</p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" ref={elementRef} className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Products</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {currentProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden animate-[fade-in_1s_ease-in-out_forwards]"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                            >
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">${product.price}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={()=>window.location = '/products'}
                            className="bg-red-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-800 transition text-center w-full mt-8"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            Shop All
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">What Our Clients Say</h2>
                <div
                    className="relative bg-white p-8 rounded-lg shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="text-center px-12">
                        <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <p className="text-lg mb-4">{testimonialsData[currentTestimonial].text}</p>
                        <p className="font-bold">- {testimonialsData[currentTestimonial].author}</p>
                    </div>
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="bg-red-700 text-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Contact Us</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div data-aos="fade-right">
                            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-5 h-5" />
                                <span>(267) 962-9559</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-5 h-5" />
                                <span>info@festivedecorpro.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                <span>Available 7 days a week, 9AM-7PM</span>
                            </div>
                        </div>
                        <form className="space-y-4" data-aos="fade-left">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 rounded text-gray-800"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 rounded text-gray-800"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                className="w-full p-3 rounded text-gray-800"
                            ></textarea>
                            <button className="bg-white text-red-700 px-6 py-3 rounded hover:bg-gray-100 transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p>&copy; 2024 Festive Decor Pro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
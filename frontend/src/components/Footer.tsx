import Link from 'next/link';
import {FaGlobe, FaInstagram, FaLinkedin, FaXTwitter} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-gray-300 border-t-2 py-8 sm:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Manik Lakhanpal</h3>
                        <p className="text-sm">Full Stack Developer | iOS Developer | Crafting Seamless Web and Mobile
                            Experiences</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/in/lakhanpalmanik/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20}/>
                            </a>
                            <a
                                href="https://x.com/w16manik"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="X (formerly Twitter)"
                            >
                                <FaXTwitter size={20}/>
                            </a>
                            <a
                                href="https://www.w16manik.ninja"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Website"
                            >
                                <FaGlobe size={20}/>
                            </a>
                            <a
                                href="https://instagram.com/w16.manik"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20}/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/main" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                            <li>
                                <Link href="https://www.w16manik.ninja" className="hover:text-white transition-colors">
                                    About Me
                                </Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Contact Me</h3>
                        <address className="not-italic">
                            <p>Discord: lakhanpalmanik</p>
                            <p>Email: lakhanpalmanik@gmail.com</p>
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    );
}


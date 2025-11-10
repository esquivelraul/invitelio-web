// invitaciones-vercel/components/Header.tsx

import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <Link href="/" className="logo">Invitelio</Link>
            
            <div className="nav-container">
                <ul className="nav-menu">
                    <li><Link href="/" className="nav-link">Inicio</Link></li>
                    <li><Link href="/catalogo" className="nav-link">Catálogo</Link></li>
                    <li><Link href="/login" className="nav-link">Acceso Novios</Link></li>
                    <li><a href="#" className="nav-link">Otros Servicios</a></li>
                    <li><a href="#" className="nav-link">Contacto</a></li>
                </ul>
                
                <ul className="social-menu">
                    <li>
                        <a href="https://www.instagram.com/xhelio_artstudio" className="social-link" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=61565684439943" className="social-link" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link" aria-label="Pinterest">
                            <i className="fab fa-pinterest-p"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
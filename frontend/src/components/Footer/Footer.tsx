import { Link } from 'react-router-dom';
import logoWhite from '@/assets/LogoWhite.svg';
import { Separator } from '@/components/Shadcn/Separator';

const Footer = () => (
  <footer className="w-full bg-blue-600">
    <div className="footer-content max-w-7xl mx-auto px-2 lg:px-8 pt-8 sm:pt-12 pb-2">
      <div className="footer-middle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-[8px]">
        {/* About Us Block */}
        <div className="footer-block about-us">
          <div className="about-us-wrapper flex flex-col gap-4">
            <div className="footer-logo mb-2">
              <img src={logoWhite} alt="CorpoSup Logo" className="w-[160px] sm:w-[200px] md:w-[250px]" />
            </div>
            <div className="about-us text-white text-sm">
              <p>
                Corposup est le leader B2B au Maroc, spécialisé dans la mise en relation d'entreprises, la gestion de commandes et la fourniture de services adaptés à vos besoins professionnels.
              </p>
            </div>
            <div className="social-login-links social-footer">
              <div className="socials-wrap">
                <ul className="flex gap-3 mt-2">
                  <li className="li-social facebook-social">
                    <a title="Facebook" href="https://web.facebook.com/share/r/1BH6bRUzNT/" target="_blank" rel="noopener noreferrer">
                      <span className="icon-social-facebook">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li className="li-social linkedin-social">
                    <a title="LinkedIn" href="https://www.linkedin.com/company/corposup" target="_blank" rel="noopener noreferrer">
                      <span className="icon-social-linkedin">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.45 20.45h-3.4v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.691V9h3.264v1.562h.046c.455-.861 1.564-1.766 3.22-1.766 3.444 0 4.079 2.267 4.079 5.218v6.436zM5.337 7.433a1.968 1.968 0 01-1.97-1.97c0-1.087.883-1.97 1.97-1.97s1.97.883 1.97 1.97a1.97 1.97 0 01-1.97 1.97zm1.7 13.017h-3.4V9h3.4v11.45z" />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li className="li-social instagram-social">
                    <a title="Instagram" href="https://www.instagram.com/corposup/" target="_blank" rel="noopener noreferrer">
                      <span className="icon-social-instagram">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Plus d'information Block */}
        <div className="footer-block footer-links-plus-informations">
          <div className="block ft-informations">
            <div className="title text-white text-base sm:text-lg font-semibold mb-3">Plus d'information</div>
            <div className="content">
              <ul className="text-gray-300 space-y-1.5 text-sm">
                <li><Link to="/about">Qui sommes nous ?</Link></li>
                <li><Link to="/carriere">Carrières</Link></li>
                <li><Link to="/magasins">Nos magasins</Link></li>
                <li><Link to="/engagements">Engagements Corposup</Link></li>
                <li><Link to="/terms">Conditions générales d'utilisation</Link></li>
                <li><Link to="/sales-terms">Conditions générales de vente</Link></li>
                <li><Link to="/legal">Informations légales</Link></li>
                <li><Link to="/privacy#securite">Sécurité</Link></li>
                <li><Link to="/privacy">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Nos engagements de service Block */}
        <div className="footer-block footer-links-engagements">
          <div className="block ft-engagements">
            <div className="title text-white text-base sm:text-lg font-semibold mb-3">Nos engagements de service</div>
            <div className="content">
              <ul className="text-gray-300 space-y-1.5 text-sm">
                <li><Link to="/conseils">Conseils d'experts</Link></li>
                <li><Link to="/services#prix">Meilleurs prix garantis</Link></li>
                <li><Link to="/services#livraison">Livraison</Link></li>
                <li><Link to="/services#sav">Service Après Vente</Link></li>
                <li><Link to="/services#retours">Retours & remboursement</Link></li>
                <li><Link to="/help">Besoin d'aide ?</Link></li>
                <li><Link to="/tracking">Suivi de votre commande</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Nos Offres Block */}
        <div className="footer-block footer-links-nos-offres">
          <div className="block ft-nos-offres">
            <div className="title text-white text-base sm:text-lg font-semibold mb-3">Nos Catégories</div>
            <div className="content">
              <ul className="text-gray-300 space-y-1.5 text-sm">
                <li><a href="/depliant" target="_blank" rel="noopener noreferrer">Agriculture et alimentation</a></li>
                <li><Link to="/marques">Machine et outils</Link></li>
                <li><Link to="/promotions">Métallurgie, chimie et plastiques</Link></li>
                <li><Link to="/audio">Emballage, publicité et bureaux</Link></li>
                <li><Link to="/jeux-consoles">Maison, éclairage et construction</Link></li>
                <li><Link to="/ecouteurs">Vêtements textiles et accessoires de mode</Link></li>
                <li><Link to="/lecteur-dvd">Électronique et appareils électroménagers</Link></li>
                <li><Link to="/tablettes">Équipement électrique, composants et télécommunication</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      {/* Copyright */}
      <div className="copyright">
        <div className="footer-copyright-content">
          <div className="copyright-footer text-center text-gray-300 text-xs py-2">
            <address>Copyright © 2025 Corposup, Tous les droits sont réservés.</address>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

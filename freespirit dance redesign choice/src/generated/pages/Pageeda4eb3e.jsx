// Generated from static website/site/contact/index.html by tools/generate.mjs
import { Link } from 'react-router';
import Icon from '../../components/Icon.jsx';
import { submitBooking } from '../../lib/bookingForm.js';

export default function Pageeda4eb3e() {
  return (
    <>
      {" "}
      <div className="max-w-7xl mx-auto px-6">
        {" "}
        <div className="text-center mb-16">
          {" "}
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            {" Hai să "}
            <span className="text-gradient">
              vorbim
            </span>
            {" "}
          </h1>
          {" "}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {" Suntem aici să îți răspundem la orice întrebare despre Brazilian Zouk sau despre școala noastră. "}
          </p>
          {" "}
        </div>
        {" "}
        <section id="booking" className="py-24 px-6 bg-brand-light relative overflow-hidden">
          {" "}
          <div className="max-w-7xl mx-auto">
            {" "}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {" "}
              <div className="reveal">
                {" "}
                <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-premium border border-brand-purple/5">
                  {" "}
                  <h2 className="font-display font-bold text-4xl mb-4 text-brand-dark tracking-tight">
                    {" Rezervă "}
                    <span className="text-brand-purple">
                      o lecție
                    </span>
                    {" "}
                  </h2>
                  {" "}
                  <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                    {" Ești gata să intri în lumea Brazilian Zouk? Trimite-ne un mesaj și te contactăm pentru a-ți confirma locul la prima ta ședință. "}
                  </p>
                  {" "}
                  <form action="mailto:freespiritdance9@gmail.com" method="POST" id="booking-form" className="space-y-6" onSubmit={submitBooking}>
                    {" "}
                    {" "}
                    <input type="text" name="goldpot" className="hidden" />
                    {" "}
                    <div className="grid md:grid-cols-2 gap-6">
                      {" "}
                      <div>
                        {" "}
                        <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 ml-1">
                          Nume Complet
                        </label>
                        {" "}
                        <input type="text" name="nume" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all duration-300" placeholder="ex. Alex Popescu" />
                        {" "}
                      </div>
                      {" "}
                      <div>
                        {" "}
                        <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 ml-1">
                          Telefon
                        </label>
                        {" "}
                        <input type="tel" name="telefon" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all duration-300" placeholder="07xx xxx xxx" />
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div>
                      {" "}
                      <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 ml-1">
                        Email
                      </label>
                      {" "}
                      <input type="email" name="email" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all duration-300" placeholder="hello@exemplu.com" />
                      {" "}
                    </div>
                    {" "}
                    <div>
                      {" "}
                      <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 ml-1">
                        Mesaj
                      </label>
                      {" "}
                      <textarea name="mesaj" required rows="4" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all duration-300" placeholder="Cum te putem ajuta?"></textarea>
                      {" "}
                    </div>
                    {" "}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      {" "}
                      <input type="checkbox" name="accept" required className="mt-1 w-5 h-5 rounded border-gray-200 text-brand-purple focus:ring-brand-purple/20 transition cursor-pointer" />
                      {" "}
                      <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition">
                        {" Sunt de acord cu "}
                        <Link to="/legal/termeni-si-conditii" className="text-brand-purple underline underline-offset-2">
                          Termenii și Condițiile
                        </Link>
                        {" și am citit "}
                        <Link to="/legal/politica-de-confidentialitate" className="text-brand-purple underline underline-offset-2">
                          Politica de Confidențialitate
                        </Link>
                        {". "}
                      </span>
                      {" "}
                    </label>
                    {" "}
                    <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-premium text-white font-bold text-lg shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 transition-all duration-300">
                      {" Trimite Rezervarea "}
                    </button>
                    {" "}
                    <p className="text-xs text-center text-gray-400 font-medium">
                      {" "}
                      <i data-lucide="shield-check" className="w-3.5 h-3.5 inline-block mr-1 align-text-bottom text-brand-purple"></i>
                      {" Datele tale sunt în siguranță. Nu trimitem spam. "}
                    </p>
                    {" "}
                  </form>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="space-y-8 reveal" style={{ "transitionDelay": "200ms" }}>
                {" "}
                <div className="bg-brand-dark text-white rounded-[40px] p-10 md:p-14 shadow-premium relative overflow-hidden">
                  {" "}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                  {" "}
                  <h3 className="font-display font-bold text-2xl mb-10 relative z-10">
                    {" Unde ne găsești "}
                  </h3>
                  {" "}
                  <ul className="space-y-8 relative z-10">
                    {" "}
                    <li className="flex items-start gap-5">
                      {" "}
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                        {" "}
                        <Icon name="MapPin" dataName="map-pin" className="w-6 h-6 text-brand-pink" />
                        {" "}
                      </div>
                      {" "}
                      <div>
                        {" "}
                        <p className="font-bold text-lg mb-1">
                          Studioul nostru
                        </p>
                        {" "}
                        <a href="https://maps.app.goo.gl/91gsV8jJNypgBT2f6" target="_blank" className="text-gray-400 hover:text-white transition-colors leading-relaxed">
                          {" Intrarea Vitor Eftimiu nr.2 "}
                        </a>
                        {" "}
                      </div>
                      {" "}
                    </li>
                    {" "}
                    <li className="flex items-start gap-5">
                      {" "}
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                        {" "}
                        <Icon name="Phone" dataName="phone" className="w-6 h-6 text-brand-purple" />
                        {" "}
                      </div>
                      {" "}
                      <div>
                        {" "}
                        <p className="font-bold text-lg mb-1">
                          {"Telefon & WhatsApp"}
                        </p>
                        {" "}
                        <a href="tel:+40735425765" className="text-gray-400 hover:text-white transition-colors block">
                          {" +40735425765 "}
                        </a>
                        {" "}
                        <a href="https://wa.me/40735425765" target="_blank" className="text-xs text-brand-pink font-bold mt-2 inline-flex items-center gap-1 hover:underline">
                          {" Scrie-ne pe WhatsApp "}
                          <i data-lucide="arrow-up-right" className="w-3 h-3"></i>
                          {" "}
                        </a>
                        {" "}
                      </div>
                      {" "}
                    </li>
                    {" "}
                  </ul>
                  {" "}
                  <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap gap-6 relative z-10">
                    {" "}
                    <a href="https://www.facebook.com/free.spiritdanceromania" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                      {" "}
                      <Icon name="Facebook" dataName="facebook" className="w-5 h-5" />
                      {" "}
                    </a>
                    {" "}
                    <a href="https://www.instagram.com/free.spiritdanceromania" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                      {" "}
                      <Icon name="Instagram" dataName="instagram" className="w-5 h-5" />
                      {" "}
                    </a>
                    {" "}
                    <a href="https://www.youtube.com/@free.spiritdanceromania" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                      {" "}
                      <Icon name="Youtube" dataName="youtube" className="w-5 h-5" />
                      {" "}
                    </a>
                    {" "}
                    <a href="https://www.tiktok.com/@free.spiritdanceromania" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                      {" "}
                      <Icon name="Music2" dataName="music-2" className="w-5 h-5" />
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="rounded-[40px] overflow-hidden shadow-premium border-4 border-white h-72 lg:h-80 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                  {" "}
                  <div className={"w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.6410456848694!2d26.106524876848695!3d44.42001107107609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff7f113048ff%3A0x3acd9914fba8f328!2sFree%20Spirit%20Dance%20Studio!5e0!3m2!1sro!2sro!4v1719478361187!5m2!1sro!2sro" width="600" height="450" style={{ "border": "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        {" "}
      </div>
      {" "}
    </>
  );
}

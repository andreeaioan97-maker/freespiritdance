// Generated from static website/site/404.html by tools/generate.mjs
import { Link } from 'react-router';
import Icon from '../../components/Icon.jsx';

export default function Pagedf58248c() {
  return (
    <>
      {" "}
      <div className="min-h-[70vh] flex items-center justify-center px-6 relative overflow-hidden bg-mesh">
        {" "}
        {" "}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          {" "}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-brand-purple/5 rounded-full blur-[80px] animate-pulse"></div>
          {" "}
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px] animate-pulse" style={{ "animationDelay": "2s" }}></div>
          {" "}
        </div>
        {" "}
        <div className="max-w-3xl w-full text-center space-y-12 reveal">
          {" "}
          <div className="relative inline-block">
            {" "}
            <h1 className="font-display font-black text-[150px] md:text-[220px] leading-none text-brand-purple/10 select-none">
              {" 404 "}
            </h1>
            {" "}
            <div className="absolute inset-0 flex items-center justify-center">
              {" "}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] bg-white shadow-premium flex items-center justify-center transform -rotate-12 border border-brand-purple/5">
                {" "}
                <Icon name="Music2" dataName="music-2" className="w-16 h-16 md:w-24 md:h-24 text-brand-pink animate-bounce" />
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div className="space-y-6 relative z-10">
            {" "}
            <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight">
              {" Ups! Te-ai pierdut în "}
              <span className="text-gradient">
                mișcare?
              </span>
              {" "}
            </h2>
            {" "}
            <p className="text-xl text-gray-500 leading-relaxed max-w-xl mx-auto">
              {" Pagina pe care o cauți nu există sau a fost mutată. Nu-ți face griji, putem găsi drumul înapoi spre ringul de dans împreună. "}
            </p>
            {" "}
          </div>
          {" "}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            {" "}
            <Link to="/" className="px-10 py-5 rounded-full bg-gradient-premium text-white font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
              {" "}
              <i data-lucide="home" className="w-5 h-5"></i>
              {" Mergi la Acasă "}
            </Link>
            {" "}
            <Link to="/cursuri" className="px-10 py-5 rounded-full bg-white border border-gray-200 text-gray-700 font-bold hover:border-brand-purple hover:text-brand-purple transition-all duration-300">
              {" Vezi Cursurile "}
            </Link>
            {" "}
          </div>
          {" "}
          <div className="pt-8">
            {" "}
            <p className="text-sm text-gray-400 font-medium italic">
              {" \"Dacă te-ai împiedicat, fă-o să pară parte din coregrafie.\" 😉 "}
            </p>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}

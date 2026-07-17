export default function Footer() {
  return (
    <footer className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ">
      <p>&copy; 2026 HDTG Inc. Todos os direitos reservados.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover: transition-colors">
          Termos
        </a>
        <a href="#" className="hover: transition-colors">
          Privacidade
        </a>
        <a href="#" className="hover: transition-colors">
          Suporte
        </a>
      </div>
    </footer>
  );
}

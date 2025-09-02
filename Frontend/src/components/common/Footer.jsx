export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto py-10 px-6 md:px-10 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ResuMaster. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

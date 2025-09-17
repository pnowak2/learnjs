export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>© {currentYear} piotr nowak</p>
    </footer>
  );
}
import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * max);
} 

export default function Header() {
  const randomIndex = genRandomInt(reactDescriptions.length);
  const reactDescription = reactDescriptions[randomIndex];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescription} React concepts you will need for almost any app you are going to build!
      </p>
    </header>
  );
}

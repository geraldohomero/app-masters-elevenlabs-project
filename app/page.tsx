import styles from "./page.module.css";
import ListaVozes from "./components/listaVozes";
import 'dotenv/config';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Conversor de Texto em Voz</h1>
      <ListaVozes />
    </main>
  );
}

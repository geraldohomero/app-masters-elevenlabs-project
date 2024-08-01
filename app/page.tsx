import styles from "./page.module.css";
import ListaVozes from "./components/listaVozes";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Texto em Voz</h1>
      <h3>ElevenLabs API</h3>
      <h6>Projeto App Masters</h6>
      <ListaVozes />
    </main>
  );
}

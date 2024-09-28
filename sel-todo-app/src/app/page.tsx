import styles from "./page.module.css";
import TaskList from "@/components/TaskList/TaskList";
import ActionMenu from "@/components/ActionMenu/ActionMenu";

export default function Home() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <a href="/">Tasks</a>
                <a target="_blank" href="https://github.com/Kevinjchang98/SEL-Interview-Todo-App">Source code</a>
            </header>
            <main className={styles.main}>
                <h1>SEL Todo App</h1>
                <ActionMenu/>
                <TaskList/>
            </main>
        </div>
    );
}

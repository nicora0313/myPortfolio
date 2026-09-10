import styles from "@/styles/components.module.css";

export default function PageTitle({ children }) {
  return (
    <div className={`section-head ${styles.pageTitle}`}>
      <h1 className="route-focus-target" tabIndex="-1">{children}</h1>
    </div>
  );
}

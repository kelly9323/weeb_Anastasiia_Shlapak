import { useFetchArticles } from "../../hooks/useFetchArticles";
import { Link } from "react-router-dom";
import styles from "./ArticlesPage.module.scss";
import Button from "../../components/Button/Button";
import { useState } from "react";
import ArticleFormModal from "../../components/Modal/ArticleFormModal";

export default function ArticlesPage() {
  const { articles, loading, error, refetch } = useFetchArticles();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Tous nos articles</h1>
        <p>
          Découvrez nos dernières publications sur le web et les technologies
        </p>
        <div className={styles.header__actions}>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowCreateModal(true)}
          >
            Créer un article
          </Button>
        </div>
      </header>

      {articles.length === 0 ? (
        <div className={styles.empty}>
          <p>Aucun article disponible pour le moment.</p>
        </div>
      ) : (
        <div className={styles.articles}>
          {articles.map((article) => (
            <article key={article.id} className={styles.card}>
              <div className={styles.card__header}>
                <h2 className={styles.card__title}>{article.title}</h2>
                <div className={styles.card__meta}>
                  <span className={styles.card__author}>
                    Par {article.author}
                  </span>
                  <span className={styles.card__date}>
                    {new Date(article.created_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className={styles.card__content}>
                <p>
                  {article.content.length > 200
                    ? `${article.content.substring(0, 200)}...`
                    : article.content}
                </p>
              </div>
              <Link
                to={`/articles/${article.id}`}
                className={styles.card__link}
              >
                Lire la suite →
              </Link>
            </article>
          ))}
        </div>
      )}
      {showCreateModal && (
        <ArticleFormModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

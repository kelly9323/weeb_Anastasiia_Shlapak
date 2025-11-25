import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteArticle, fetchArticleById } from "../../api/articlesApi";
import type { Article } from "../../api/articlesApi";
import styles from "./ArticleDetailPage.module.scss";
import Button from "../../components/Button/Button";
import ArticleFormModal from "../../components/Modal/ArticleFormModal";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await fetchArticleById(parseInt(id));
        setArticle(data);
      } catch (err) {
        setError("Article introuvable.");
        console.error("Error loading article:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    setDeleting(true);
    try {
      await deleteArticle(parseInt(id));
      navigate("/articles");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  const refreshArticle = async () => {
    if (!id) return;
    try {
      const data = await fetchArticleById(parseInt(id));
      setArticle(data);
    } catch (err) {
      console.error("Error refreshing article:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error || "Article introuvable."}</p>
          <Link to="/articles" className={styles.backLink}>
            ← Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/articles" className={styles.backLink}>
        ← Retour aux articles
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>Par {article.author}</span>
            <span className={styles.date}>
              {new Date(article.created_at).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className={styles.content}>
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowEditModal(true)}
          >
            Modifier
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Supprimer
          </Button>
        </div>
      </article>
      {showEditModal && (
        <ArticleFormModal
          article={article}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            refreshArticle();
          }}
        />
      )}
      {showDeleteConfirm && (
        <div
          className={styles.overlay}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
            <p className={styles.warning}>Cette action est irréversible.</p>
            <div className={styles.confirmButtons}>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Annuler
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Suppression..." : "Supprimer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

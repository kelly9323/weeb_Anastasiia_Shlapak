import { useState } from "react";
import { createArticle, updateArticle } from "../../api/articlesApi";
import type { Article } from "../../api/articlesApi";
import Button from "../Button/Button";
import styles from "./ArticleFormModal.module.scss";

interface ArticleFormModalProps {
  article?: Article;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ArticleFormModal({
  article,
  onClose,
  onSuccess,
}: ArticleFormModalProps) {
  const isEditMode = !!article; // Check if we're editing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    author: article?.author || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && article) {
        // Update existing article
        await updateArticle(article.id, formData);
      } else {
        // Create new article
        await createArticle(formData);
      }
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Erreur lors de ${isEditMode ? "la modification" : "la création"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2>{isEditMode ? "Modifier l'article" : "Créer un nouvel article"}</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Le titre de votre article"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="author">Auteur</label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Votre nom (optionnel)"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content">Contenu *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Écrivez votre article ici..."
              rows={10}
              required
            />
          </div>

          <div className={styles.buttons}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
            >
              {loading
                ? isEditMode
                  ? "Enregistrement..."
                  : "Création..."
                : isEditMode
                ? "Enregistrer"
                : "Publier"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

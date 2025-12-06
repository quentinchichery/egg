<template>
  <div class="no-results-message">
    <span class="material-icons sad-icon">
      sentiment_dissatisfied
    </span>
    <h2>Aucune adresse ne correspond aux filtres choisis.</h2>
    <p>Veuillez essayer de modifier vos critères de recherche.</p>
  </div>
</template>

<style scoped>
.no-results-message {
  text-align: center;
  padding: 40px 20px;
  margin-top: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  color: #64748b;
}

.no-results-message h2 {
  color: #334155;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
}

.sad-icon {
  font-size: 48px;
  color: #94a3b8; /* Gris bleuté neutre, ou gardez votre rouge si vous préférez */
  display: block;
  margin: 0 auto 10px;
}
</style>
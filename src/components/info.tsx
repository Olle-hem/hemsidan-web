function info() {
  return (
    <section className="info">
      <h1>Om Oss</h1>
      <p>
        Välkommen till vårt projekt! Vi brinner för att skapa smarta, snygga och funktionella webblösningar.
        Vår vision är att förenkla vardagen för både företag och privatpersoner genom modern teknik.
      </p>

      <div className="info-grid">
        <div className="info-card">
          <h3>Vårt Uppdrag</h3>
          <p>Att leverera högkvalitativa digitala lösningar som gör skillnad.</p>
        </div>

        <div className="info-card">
          <h3>Våra Värderingar</h3>
          <p>Innovation, samarbete och transparens är kärnan i allt vi gör.</p>
        </div>

        <div className="info-card">
          <h3>Framtiden</h3>
          <p>Vi utvecklar ständigt nya idéer och ser fram emot att växa tillsammans med våra kunder.</p>
        </div>
      </div>

      <div className="info-contact">
        <h2>Kontakta oss</h2>
        <p>Har du frågor eller vill veta mer? Hör av dig till oss!</p>
        <p>📧 kontakt@mittföretag.se | 📞 070-123 45 67</p>
      </div>
    </section>
  );
}

export default info;

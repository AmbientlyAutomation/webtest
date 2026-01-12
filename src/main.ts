import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="ambient-background">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="noise-overlay"></div>
  </div>

  <header class="header">
    <img src="/assets/OfficialLogo.png" alt="Ambiently" class="logo-image" />
  </header>
  
  <main class="main-content">
    <div class="hero-grid">
      <div class="hero-text-col">
        <h1 class="headline">Never read another review again.</h1>
        <h2 class="subheadline">Reviews are stale. Ratings lie. Ambiently gives you the real story—<span class="highlight-serif">live from the ground.</span></h2>
        
        <form class="signup-form" id="signup-form">
          <input type="email" placeholder="Your email address" required class="email-input" />
          <button type="submit" class="cta-button">Count me in &rarr;</button>
        </form>
        <p class="anti-spam">We don’t spam, unlike fake reviews ;)</p>
      </div>
      <div class="hero-visual-col">
        <div class="mockup-wrapper">
          <img src="/assets/Imagemockupalt.png" alt="Live Cafe Feed" class="mockup-image" />
        </div>
      </div>
    </div>
  </main>
`

// Handle email collection
const form = document.getElementById('signup-form') as HTMLFormElement;

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailInput = form.querySelector('.email-input') as HTMLInputElement;
  const email = emailInput.value;

  // 1. Visual feedback (LOADING state)
  const button = form.querySelector('.cta-button') as HTMLButtonElement;
  const originalText = button.innerHTML;
  button.innerHTML = 'Sending...';
  button.disabled = true;

  // 2. Send to Vercel Serverless Function
  fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  .then(async (response) => {
    if (response.ok) {
      // SUCCESS
      button.innerHTML = 'Thanks! &check;';
      button.style.backgroundColor = '#10b981'; // Green success color
      form.reset();
    } else {
      // ERROR
      throw new Error('Submission failed');
    }
  })
  .catch((err) => {
    console.error(err);
    button.innerHTML = 'Error. Try again.';
    button.style.backgroundColor = '#ef4444'; // Red error color
  })
  .finally(() => {
    // 3. Reset after a delay
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.backgroundColor = '';
      button.disabled = false;
    }, 3000);
  });
});


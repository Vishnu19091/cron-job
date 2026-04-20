import Link from "next/link";
import Image from "next/image";
import styles from "./_styles/page.module.css";
import { getLoggedInUser } from "../_lib/server/appwrite.server";

const features = [
  {
    icon: "🔁",
    title: "Flexible Scheduling",
    desc: "Use cron expressions or simple intervals — every minute, hour, or day. Full timezone support.",
  },
  {
    icon: "🌐",
    title: "HTTP Methods",
    desc: "Fire GET, POST, PUT, or DELETE requests to any URL. Send custom request bodies.",
  },
  {
    icon: "📊",
    title: "Execution Logs",
    desc: "Every run is recorded — status code, response time, response body. Up to 150 logs per job.",
  },
  {
    icon: "▶️",
    title: "Manual Test Runs",
    desc: "Trigger any job instantly before its next scheduled run to verify it works.",
  },
  {
    icon: "👤",
    title: "Multi-User",
    desc: "Each user manages their own jobs and logs. Secure, isolated data per account.",
  },
  {
    icon: "🔐",
    title: "Secure Auth",
    desc: "Sign in with email/password or Google OAuth. Sessions are encrypted and server-validated.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a Job",
    desc: "Give your job a name, paste in a URL, pick an HTTP method, and optionally add a request body.",
  },
  {
    number: "02",
    title: "Set a Schedule",
    desc: "Choose a cron expression or a simple interval. Set your timezone so runs happen exactly when you expect.",
  },
  {
    number: "03",
    title: "Monitor & Logs",
    desc: "Watch real-time results in the dashboard. Every execution is logged with status code and response time.",
  },
];

const methods = ["GET", "POST", "PUT", "DELETE"];
const methodColors = {
  GET: { bg: "#e6f4ea", text: "#1a6b35" },
  POST: { bg: "#e8f0fe", text: "#1a4fad" },
  PUT: { bg: "#fff3e0", text: "#b45309" },
  DELETE: { bg: "#fce8e6", text: "#b31412" },
};

export default async function Home() {
  const user = await getLoggedInUser();
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>URL Scheduler & Monitor</span>
          <h1 className={styles.heroTitle}>
            Keep your services alive.
            <br />
            <span className={styles.accent}>Automatically.</span>
          </h1>
          <p className={styles.heroSub}>
            Schedule HTTP requests to any URL on a cron schedule. Monitor
            uptime, track response times, and inspect logs — all in one place.
          </p>
          <div className={styles.heroCTA}>
            {user && (
              <Link href="/dashboard" className={styles.btnPrimary}>
                Go to dashboard
              </Link>
            )}
            {!user && (
              <Link href="/auth/signup" className={styles.btnPrimary}>
                Get Started — it&apos;s free
              </Link>
            )}

            {!user && (
              <Link href="/auth/signin" className={styles.btnSecondary}>
                Sign In
              </Link>
            )}
          </div>

          {/* mock terminal */}
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} style={{ background: "#ef4444" }} />
              <span className={styles.dot} style={{ background: "#f59e0b" }} />
              <span className={styles.dot} style={{ background: "#22c55e" }} />
              <span className={styles.terminalTitle}>scheduler · running</span>
            </div>
            <div className={styles.terminalBody}>
              <p>
                <span className={styles.dim}>→</span>{" "}
                <span className={styles.green}>✓</span> GET
                https://api.myapp.com/ping{" "}
                <span className={styles.dim}>200 · 142ms</span>
              </p>
              <p>
                <span className={styles.dim}>→</span>{" "}
                <span className={styles.green}>✓</span> POST
                https://hooks.service.io/daily{" "}
                <span className={styles.dim}>201 · 89ms</span>
              </p>
              <p>
                <span className={styles.dim}>→</span>{" "}
                <span className={styles.green}>✓</span> GET
                https://mysite.dev/healthz{" "}
                <span className={styles.dim}>200 · 56ms</span>
              </p>
              <p>
                <span className={styles.dim}>→</span>{" "}
                <span className={styles.yellow}>!</span> PUT
                https://sync.api.com/update{" "}
                <span className={styles.dim}>503 · 2341ms</span>
              </p>
              <p className={styles.blink}>
                <span className={styles.dim}>▌</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HTTP METHODS */}
      <section className={styles.methodsSection}>
        <p className={styles.methodsLabel}>Supports all HTTP methods</p>
        <div className={styles.methodsRow}>
          {methods.map((m) => (
            <span
              key={m}
              className={styles.methodBadge}
              style={{
                background: methodColors[m].bg,
                color: methodColors[m].text,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>How it works</p>
          <h2 className={styles.sectionTitle}>
            Three steps to automated monitoring
          </h2>
          <div className={styles.stepsGrid}>
            {steps.map((s) => (
              <div key={s.number} className={styles.stepCard}>
                <span className={styles.stepNumber}>{s.number}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${styles.section} ${styles.featuresBg}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Features</p>
          <h2 className={styles.sectionTitle}>
            Everything you need to schedule & monitor
          </h2>
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>Cron-Job</span>
          <div className={styles.footerLinks}>
            {!user && (
              <>
                <Link href="/auth/signin">Sign In</Link>
                <Link href="/auth/signup">Sign Up</Link>
              </>
            )}
            <a
              href="https://github.com/Vishnu19091/cron-job"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerGithub}
            >
              <Image src="/github.svg" alt="GitHub" width={50} height={50} />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

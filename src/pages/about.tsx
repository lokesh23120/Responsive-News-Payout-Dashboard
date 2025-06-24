export default function About() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cyan-200 text-gray-900 px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl font-bold mb-6">About Me</h1>

        <p className="text-xl mb-6 leading-relaxed">
          Hello! I'm <strong>Lokesh Saini</strong>, a passionate software developer with a strong
          foundation in problem-solving. I completed my <strong>M.Tech</strong> from
          <strong> IIIT Delhi</strong>, where I developed both technical and analytical expertise.
        </p>

        <p className="text-xl mb-6 leading-relaxed">
          I've solved over <strong>500+ DSA problems</strong> across various platforms and regularly
          engage with the <strong>Problem of the Day</strong>. My interests lie in software
          development, full-stack engineering, and mobile app development.
        </p>

        <p className="text-xl mb-6 leading-relaxed">
          My notable projects include a <strong>Weather App</strong> with GPS and AI-based forecasting,
          and a <strong>PII Detection Tool</strong> for secure data systems. I'm committed to building
          innovative and user-focused applications.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
          <ul className="text-lg space-y-2">
            <li>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:lokesh23120@iiitd.ac.in" className="text-blue-800 underline">
                lokesh23120@iiitd.ac.in
              </a>
            </li>
            <li>
              💼 <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/lokesh-saini-a1a14318a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 underline"
              >
                linkedin.com/in/lokesh-saini-a1a14318a/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

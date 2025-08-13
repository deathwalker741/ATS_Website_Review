"use client"

export default function SIGProgrammePage() {
  return (
    <section className="py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-[#850101]">Summer Institute for the Gifted (SIG)</h1>
        <p className="mb-4">Summer Institute for the Gifted (SIG) runs <strong>2- and 3-week</strong> academic programmes for gifted and academically talented students ages <strong>5-17</strong>. SIG combines challenging academics with social, cultural, and recreational activities for a truly transformative experience.</p>
        <p className="mb-4">Unlike single-track programmes, SIG lets students pick <strong>two courses</strong> from Humanities, Math &amp; Science, Creative &amp; Performing Arts, and Fitness &amp; Recreation. Social-emotional growth is prioritised through evening/weekend activities, counsellor group bonding, and on-/off-campus excursions.</p>
        <p className="mb-6">With <strong>35+ years</strong> of experience, SIG enriches students’ natural talents while encouraging exploration of personal intellectual passions.</p>

        <h2 className="text-2xl font-bold mb-3">Programme Details</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Duration:</strong> 3 weeks&nbsp;– University of Miami (2 weeks) · University of Michigan (2 or 3 weeks)</li>
          <li><strong>Residential Locations:</strong> Bryn Mawr College · UCLA · University of Miami · Yale · Emory · UC Berkeley · University of Michigan</li>
          <li><strong>Start Dates:</strong> Vary by campus. See <a href="http://www.giftedstudy.org/residential/" className="text-blue-600 underline" target="_blank">giftedstudy.org/residential</a> for the schedule.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Grades:</strong> 4 – 12</li>
          <li><strong>Ei ASSET Talent Search Score:</strong> ≥ 90th percentile in any subject</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Application Process</h2>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>Go to <a href="https://www.summerdiscovery.com/programs/sig/institute-for-the-gifted" target="_blank" className="text-blue-600 underline">SIG application portal</a>.</li>
          <li>Review desired programme dates and class selections in advance.</li>
          <li>During the application, upload your Ei ATS percentile scores when prompted for eligibility evidence.</li>
          <li>Email <a href="mailto:sig.info@giftedstudy.org" className="text-blue-600 underline">sig.info@giftedstudy.org</a> for any assistance.</li>
        </ol>

        <div className="mt-8 flex gap-4">
          <a
            href="https://www.giftedstudy.org/"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/programmes#sig"
            className="inline-flex items-center px-6 py-3 border-2 border-[#850101] text-[#850101] font-semibold rounded-lg hover:bg-[#850101] hover:text-white transition-colors"
          >
            Back to Partners
          </a>
        </div>
      </div>
    </section>
  );
}
